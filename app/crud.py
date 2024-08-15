from sqlalchemy.orm import Session

from . import models, schemas


def get_company(db: Session, company_id: int):
    return db.query(models.Company).filter(models.Company.company_id == company_id).first()


def get_companies(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Company).order_by(models.Company.company_id.desc()).offset(skip).limit(limit).all()


def create_company(db: Session, company: schemas.CompanyCreate):
    db_company = models.Company(**company.dict())
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company


def delete_company(db: Session, company_id: int):
    db_company = db.query(models.Company).filter(models.Company.company_id == company_id).first()
    if db_company:
        db.delete(db_company)
        db.commit()
    return db_company


def update_company(db: Session, company_id: int, company: schemas.CompanyCreate):
    db_company = db.query(models.Company).filter(models.Company.company_id == company_id).first()
    if db_company:
        for key, value in company.dict().items():
            setattr(db_company, key, value)
        db.commit()
        db.refresh(db_company)
    return db_company
