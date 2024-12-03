from fastapi import HTTPException, status

# Função que valida o papel (role) do usuário
def validate_role(value: str) -> str:
    roles = ["Admin", "Editor", "Viewer"]
    if value not in roles:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                             detail=f"Invalid role: {value}. Must be one of {roles}.")
    return value