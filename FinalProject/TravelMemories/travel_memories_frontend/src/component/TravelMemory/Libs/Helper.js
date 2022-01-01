export function getElement(id) {
    return document.getElementById(id);
}
export function alertBox(type, message) {
    var boxClass = "alert-danger";
    if(type == 1){
        boxClass = "alert-success";
    }
    return '<div class="alert ' + boxClass + '" role="alert">' + message + "</div>";
}
