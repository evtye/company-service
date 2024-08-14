from pydantic import BaseModel, Field, field_validator
from pydantic_core.core_schema import ValidationInfo


class CompanyBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=101)
    ownership_type: int
    inn: str


    @field_validator('inn')
    @classmethod
    def inn_validator(cls, v: str, info: ValidationInfo) -> str:
        type_ = info.data.get('ownership_type')
        if type_ is None:
            raise ValueError("Ownership type must is required")
        if not v.isdigit():
            raise ValueError("inn must contain only digits")
        expected_lengths = {0: {10, 12}, 1: {12}, 2: {10}}
        if len(v) not in expected_lengths.get(type_, {}):
            raise ValueError(f"Incorrect inn length for ownership type {type_}")
        return v


class CompanyCreate(CompanyBase):
    pass


class CompanyRead(BaseModel):
    company_id: int | None
    name: str | None
    ownership_type: int | None
    inn: str | None

    class Config:
        orm_mode = True


class Company(CompanyBase):
    company_id: int

    class Config:
        orm_mode = True
