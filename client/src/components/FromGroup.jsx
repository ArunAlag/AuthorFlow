export function FormGroup({children, errorMessage}) {
    
    return (
    <div className="form-group">
        {children}
        { errorMessage!== undefined && <div className="error-message">{errorMessage}</div>}
    </div>
    )
}