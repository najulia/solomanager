import re
from fastapi import HTTPException, status

# Definição dos valores permitidos para o método de pagamento
VALID_PAYMENT_STATUS = ["em analise", "pago", "cancelado"]

# Função de validação do método de pagamento
def validate_payment_status(value: str):
    if value not in VALID_PAYMENT_STATUS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid payment status: {value}. Must be one of {VALID_PAYMENT_STATUS}."
        )
    return value

# Função de validação do número de telefone
def validate_client_phone(value: str):
    phone_regex = r'^\+?\d{1,3}\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$'
    if not re.match(phone_regex, value):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid phone number format. It should be +[country code] [DDD] [phone number]."
        )
    return value

# Função de validação do nome do cliente
def validate_client_name(value: str):
    if not value or not value.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Name cannot be empty."
        )
    if not re.match(r"^[A-Za-zÀ-ÿ ]+$", value):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Name cannot contain special characters or numbers."
        )
    return value

