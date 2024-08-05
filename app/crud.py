from sqlalchemy.orm import Session

from . import models, schemas


def get_company(db: Session, company_id: int):
    return db.query(models.Company).filter(models.Company.company_id == company_id).first()


def get_companies(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Company).offset(skip).limit(limit).all()


def create_company(db: Session, company: schemas.CompanyCreate):
    db_company = models.Company(name=company.name, ownership_type=company.ownership_type, inn=company.inn)
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company


def delete_company(db: Session, company_id: int):
    pass


def update_company(db: Session, company_id: int, company: schemas.CompanyCreate):
    pass
