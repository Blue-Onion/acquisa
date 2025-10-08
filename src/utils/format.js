export const formarValidationError = (error) => {
if(!error.errors) return "Validation error";

if(Array.isArray(error.issues)){
  error.issues.map((err) => err.message).join(", ");
}
return JSON.stringify(error);
}