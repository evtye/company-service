from sqlalchemy import Column, Integer, String

from .database import Base


class Company(Base):
    __tablename__ = 'companies'

    company_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    ownership_type = Column(Integer)
    inn = Column(String, unique=True)
