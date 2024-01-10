export function formValidation(title, body, userId) {
    let errors = {}
    
    if(title === "") {
        errors.title = "Title Required";
    }

    if(body === "") {
        errors.body = "Body Required";
    }

    if(userId === "") {
        errors.userId = "Author Required";
    }

    return errors;
}