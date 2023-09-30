function isFullNameValid(fullName)
{
    if(fullName.length > 0 && fullName.length <= 2 || fullName.length >=50){
        document.getElementById('fullName-error').innerHTML = "Thông tin không hợp lệ";
        return false;
    } else if(fullName.length == 0){
        document.getElementById('fullName-error').innerHTML = "Bạn chưa điền thông tin";
        return false;
    } else{
        document.getElementById('fullName-error').innerHTML = "";
        return true;
    }
}

function isIdCardValid(idCard)
{
    let myIdCard = /^\d{8}$/.test(idCard);
    if(idCard.length == 0){
        document.getElementById('idCard-error').innerHTML = "Bạn chưa điền thông tin";
        return false;
    } else if(idCard.length != 0 && myIdCard == false){
        document.getElementById('idCard-error').innerHTML = "Thông tin không hợp lệ";
        return false;
    } else{
        document.getElementById('idCard-error').innerHTML = "";
        return true;
    }
}

function isEmailValid(email)
{
    let myEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(email.length == 0){
        document.getElementById('email-error').innerHTML = "Bạn chưa điền thông tin";
        return false;
    } else if(email.length != 0 && myEmail == false){
        document.getElementById('email-error').innerHTML = "Thông tin không hợp lệ";
        return false;
    } else {
        document.getElementById('email-error').innerHTML = "";
        return true;
    }
}

function isPhoneNumberValid(phoneNumber)
{
    let myNumber = /^\d{10}$/.test(phoneNumber);
    if(phoneNumber.length == 0){
        document.getElementById('phoneNumber-error').innerHTML = "Bạn chưa điền thông tin";
        return false;
    } else if(phoneNumber.length != 0 && myNumber == false){
        document.getElementById('phoneNumber-error').innerHTML = "Thông tin không hợp lệ";
        return false;
    } else{
        document.getElementById('phoneNumber-error').innerHTML = "";
        return true;
    }
}

function isAddressValid(address)
{
    if(address.length == 0){
        document.getElementById('address-error').innerHTML = "Bạn chưa điền thông tin";
        return false;
    } else{
        document.getElementById('address-error').innerHTML = "";
        return true;
    }
}

function saveInformation()
{
    console.log("đã nhận được thông tin sinh viên");
    let fullName = document.getElementById("fullName").value;
    let idCard = document.getElementById("idCard").value;
    let email = document.getElementById("email").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let address = document.getElementById("address").value;
    let gender = "";
    
    if(document.getElementById('male').checked){
        gender = document.getElementById('male').value;
    } else if(document.getElementById('female').checked){
        gender = document.getElementById('female').value;
    } else if(document.getElementById('other').checked){
        gender = document.getElementById('other').value;
    }

    if(_.isEmpty(gender)){
        document.getElementById('gender-error').innerHTML = "Bạn chưa chọn giới tính";
    } else{
        document.getElementById('gender-error').innerHTML = "";
    }

    // check valid information
    isFullNameValid(fullName);
    isPhoneNumberValid(phoneNumber);
    isIdCardValid(idCard);
    isAddressValid(address);
    isEmailValid(email);

   if(isFullNameValid(fullName) && isPhoneNumberValid(phoneNumber) && isIdCardValid(idCard)
   && isEmailValid(email) && isAddressValid(address))
    {
        let students = localStorage.getItem('students') ? (JSON.parse(localStorage.getItem('students'))) : [];
        students.push({
            fullName: fullName,
            idCard: idCard, 
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            gender: gender,
        });
    
        localStorage.setItem('students', JSON.stringify(students));
        this.renderListStudents();
    }

}

function renderListStudents()
{
    let students = localStorage.getItem('students') ? (JSON.parse(localStorage.getItem('students'))) : [];
    
    if(students.length === 0)
    {
        document.getElementById('list-students').style.display = "none";
        return false;
    }

    document.getElementById('list-students').style.display = 'block';

    let tableContent = `<tr>
    <td>#</td>
    <td>Học và tên</td>
    <td>MSSV</td>
    <td>Email</td>
    <td>Số điện thoại</td>
    <td>Giới tính</td>
    <td>Địa chỉ</td>
    <td>Thao tác</td>
    </tr>`

    students.forEach((students, index)=>{
        let keyStudent = index;
        index++;
        tableContent += `<tr>
        <td>${index}</td>
        <td>${students.fullName}</td>
        <td>${students.idCard}</td>
        <td>${students.email}</td>
        <td>${students.phoneNumber}</td>
        <td>${students.gender}</td>
        <td>${students.address}</td>
        <td><a href = '#' onclick = 'RemoveStudents(${keyStudent})' >Delete</a></td>
        </tr>`
    })

    document.getElementById('grid-students').innerHTML = tableContent;
}

function RemoveStudents(id)
{
    let students = localStorage.getItem('students') ? (JSON.parse(localStorage.getItem('students'))) : [];
    students.splice(id, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderListStudents();
}



