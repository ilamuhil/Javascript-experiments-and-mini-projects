var form = document.forms.form;
form.onsubmit = function () {
    var inputElements = document.getElementsByTagName("input");
    var errorMsg = document.createElement("div");
    errorMsg.setAttribute("class" , "alert m-2 p-2");
    errorMsg.setAttribute("id","error");

    //isempty function returns an array containing the number of empty fields and the string of labels that have empty inputs associated with it.
    function isempty() {
        var res = [0];
        var errorContent = "";
        for (let i=0;i<inputElements.length-1;i++) {
            if (inputElements[i].value == "") {
                errorContent += inputElements[i].previousElementSibling.innerText+ ", ";
                res[0] += 1;
               
            }
        }
        if (res[0] > 0) {res.push(errorContent)};
        return res;
    }

    //checks if the the two passwords match
    function pwdMatch(){
        if (inputElements[4].value != inputElements[5].value)return false;
        return true ;
    }

    function removeErrorElement(errordiv){
        form.removeChild(errordiv);
    }

    //isEmpty is an array containing 2 elements 1) number of fields that are empty 2) the innerHtml(string) of the label(s) corresponding to empty input fields 

    var isEmpty = isempty();

    //error message to be displayed if there are multiple empty fields
    if (isEmpty[0] > 1) {

        //the 1st 4 lines below are used to remove any prexisiting error messages inside the form before displaying new error messages

        var errordiv = document.getElementById("error");
        if (errordiv != null){
            removeErrorElement(errordiv);
        }
        errorMsg.classList.add("alert-danger");
        errorMsg.innerHTML = `Please fill in the following fields: <br> ${isEmpty[1].substring(0,isEmpty[1].length-2)}`;
        form.appendChild(errorMsg);
        return false;
    //error message to be displayed if there is a single empty field    
    } else if (isEmpty[0] == 1) {
        var errordiv = document.getElementById("error");
        if (errordiv != null){
            removeErrorElement(errordiv);
        }
        errorMsg.classList.add("alert-danger");
        errorMsg.innerHTML = `The <b>${isEmpty[1].substring(0,isEmpty[1].length-2)}*</b> field is required`;
        form.appendChild(errorMsg);
        return false;
       
    }
    //error message to be displayed if passwords do not match
    else if(!pwdMatch()){
        var errordiv = document.getElementById("error");
        if (errordiv != null){
            removeErrorElement(errordiv);
        }
        errorMsg.innerHTML = "Your passwords do not match";
        errorMsg.classList.add("alert-danger");
        form.appendChild(errorMsg);
        return false;
        
    }
    //success message on successful form submission
    else{
        var errordiv = document.getElementById("error");
        if (errordiv != null){
            removeErrorElement(errordiv);
        }
        errorMsg.innerHTML = "Your form has been submitted successfully";
        errorMsg.classList.add("alert-success");
        form.appendChild(errorMsg);
        return false;
        
    }
}