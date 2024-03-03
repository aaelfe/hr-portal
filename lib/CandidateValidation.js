export function validateFirstName(value) {
    let error
    if (!value) {
      error = 'Name is required'
    } 
    return error
  }