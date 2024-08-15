from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, schemas
from .database import SessionLocal

app = FastAPI()

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post('/companies/', response_model=schemas.Company)
def create_company(company: schemas.CompanyCreate, db: Session = Depends(get_db)):
    return crud.create_company(db=db, company=company)


@app.get('/companies/', response_model=list[schemas.CompanyRead])
def read_companies(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_companies(db=db, skip=skip, limit=limit)


@app.get('/companies/{company_id}', response_model=schemas.CompanyRead)
def read_company(company_id: int, db: Session = Depends(get_db)):
    db_company = crud.get_company(db=db, company_id=company_id)
    if db_company is None:
        raise HTTPException(status_code=404, detail='Company not found')
    return db_company


@app.put('/companies/{company_id}')
def update_company(company_id: int, company: schemas.CompanyCreate, db: Session = Depends(get_db)):
    db_company = crud.update_company(db=db, company_id=company_id, company=company)
    if db_company is None:
        raise HTTPException(status_code=404, detail='Company not found')
    return db_company


@app.delete('/companies/{company_id}', response_model=schemas.Company)
def delete_company(company_id: int, db: Session = Depends(get_db)):
    db_company = crud.delete_company(db=db, company_id=company_id)
    if db_company is None:
        raise HTTPException(status_code=404, detail='Company not found')
    return db_company
