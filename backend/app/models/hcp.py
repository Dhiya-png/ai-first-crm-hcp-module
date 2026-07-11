from sqlalchemy import Column, Integer, String
from app.database import Base

class HCP(Base):
    __tablename__ = "hcps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    specialization = Column(String)
    hospital = Column(String)
    email = Column(String)
    phone = Column(String)