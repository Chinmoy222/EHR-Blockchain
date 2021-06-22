pragma solidity ^0.4.17;

contract EHR {
    address public owner;
    address[] public allowedDoctors;
    string[] private medicalHistory;
    string[] private diagnosis;

    string[] private appointments;
    string[] private visits;
    
    string private name;

    string private dob;
    
    //contract
    string private email;
    string private phone;
    string private resAddress;
    string private zip;
    string private district;
    string private city;
    string private state;
    
    // 3439254 as gas limit
    function EHR (string memory _name, string memory _dob, string memory _email, string memory _phone, 
    string memory _resAddress, string memory _zip, string memory _district, string memory _city, string memory _state) 
    public {
        owner = msg.sender;
        name = _name;
        dob = _dob;
        email = _email;
        phone = _phone;
        resAddress = _resAddress;
        zip = _zip;
        district = _district;
        city = _city;
        state = _state;
    }

    //Personal Data
    
    function getName() allowedDoctorsRestricted public view returns(string memory){
        return name;
    }
    
    function getDOB() allowedDoctorsRestricted public view returns(string memory){
        return dob;
    }
    
    function getEmail() ownerRestricted public view returns(string memory){
        return email;
    }
    
    function getPhone() ownerRestricted public view returns(string memory){
        return phone;
    }
    
    
    function getResAddress() ownerRestricted public view returns(string memory){
        return resAddress;
    }
    
    function getZip() allowedDoctorsRestricted public view returns(string memory){
        return zip;
    }
    
    function getDistrict() allowedDoctorsRestricted public view returns(string memory){
        return district;
    }
    
    function getCity() allowedDoctorsRestricted public view returns(string memory){
        return city;
    }
    
    function getState() allowedDoctorsRestricted public view returns(string memory){
        return state;
    }
    
    function setName(string memory _name) ownerRestricted public{
        name = _name;
    }
    
    
    function setDOB(string memory _dob) ownerRestricted public {
        dob = _dob;
    }
        
    function setEmail(string memory _email) ownerRestricted public {
        email = _email;
    }
    
    function setPhone(string memory _phone) ownerRestricted public {
        phone = _phone;
    }
    
    function setResAddress(string memory _resAddress) ownerRestricted public {
        resAddress = _resAddress;
    }
    
    function setZip(string memory _zip) ownerRestricted public {
        zip = _zip;
    }
    
    function setDistrict(string memory _district) ownerRestricted public {
        district = _district;
    }
    
    function setCity(string memory _city) ownerRestricted public{
        city = _city;
    }
    
    function setState(string memory _state) ownerRestricted public{
        state = _state;
    }
    

    
    modifier ownerRestricted() {
        require(msg.sender == owner);
        _;
    }
    
    modifier allowedDoctorsRestricted() {
        require(checkAllowed() == true);
        _;
    }
    
    modifier allowedMedDetailsChanges() {
        require(checkMedDetails() == true);
        _;
    }
    
    //TODO Cheaper Alternative to checking required
    function checkAllowed() public view returns(bool){
        if(allowedDoctors.length > 0){
            for(uint i = 0; i < allowedDoctors.length; i++){
                if(allowedDoctors[i] == msg.sender){
                    return(true);
                }
            }
        }
        return (msg.sender == owner);
    }
    
    function checkMedDetails() public view returns(bool){
        if(allowedDoctors.length > 0){
            for(uint i = 0; i < allowedDoctors.length; i++){
                if(allowedDoctors[i] == msg.sender){
                    return(true);
                }
            }
        }
        return (false);
    }
    
    
    //Medical Data
    function addDoctorsAllowed(address doctor) public {
        allowedDoctors.push(doctor);
    }
    
    function addMedicalHistory(string memory _data) allowedMedDetailsChanges public{
        medicalHistory.push(_data);
    }
    
    function addDiagnosis(string memory _data) allowedMedDetailsChanges public{
        diagnosis.push(_data);
    }
    
    
    
    function getMedicalHistoryLen() public view allowedDoctorsRestricted returns(uint){
        return medicalHistory.length;
    }
    
    function getMedicalHistory(uint i) public view allowedDoctorsRestricted returns(string memory){
        return medicalHistory[i];
    }
    
    function getDiagnosisLen() public view allowedDoctorsRestricted returns(uint){
        return diagnosis.length;
    }
    
    function getDiagnosis(uint i) public view allowedDoctorsRestricted returns(string memory){
        return diagnosis[i];
    }

    function getAllowed1Doctors() public view returns(address []){
        return allowedDoctors;
    }
    
    
    function concat(string _a, string _b) public constant returns (string){
    bytes memory bytes_a = bytes(_a);
    bytes memory bytes_b = bytes(_b);
    string memory length_ab = new string(bytes_a.length + bytes_b.length);
    bytes memory bytes_c = bytes(length_ab);
    uint k = 0;
    for (uint i = 0; i < bytes_a.length; i++) bytes_c[k++] = bytes_a[i];
    for (i = 0; i < bytes_b.length; i++) bytes_c[k++] = bytes_b[i];
    return string(bytes_c);
    }
    
    
    
//     function ToString(bytes32 x) public constant returns (string) {
//     bytes memory bytesString = new bytes(32);
//     uint charCount = 0;
//     for (uint j = 0; j < 32; j++) {
//       byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
//       if (char != 0) {
//         bytesString[charCount] = char;
//         charCount++;
//       }
//     }
//     bytes memory bytesStringTrimmed = new bytes(charCount);
//     for (j = 0; j < charCount; j++) {
//       bytesStringTrimmed[j] = bytesString[j];
//     }
//     return string(bytesStringTrimmed);
//   }
    
    // Alternate functions 
    function createAppointment(string memory doctor, string memory date) ownerRestricted public {
     //   addDoctorsAllowed(toAddress(doctor)); //#TODO
        appointments.push(concat(concat(doctor, ' '), date));
        
    }
    
    function removeAppointmentsAtIndex(uint index) public {
    if (index >= appointments.length) return;

    for (uint i = index; i < appointments.length-1; i++) {
      appointments[i] = appointments[i+1];
    }
    appointments.length--;
  }
  
  
    function cancelAppointment(string memory doctor, string memory date) allowedDoctorsRestricted public {
        string memory appointment = string(concat(concat(doctor, ' '), date));
        for(uint i = 0; i < appointments.length; i++){
            if(keccak256(appointments[i]) == keccak256(appointment)){
                uint loc = i;
                 break;
            }
        }
        removeAppointmentsAtIndex(loc);
    }
    
    
    function confirmAppointmentReached(string memory doctor, string memory date) allowedDoctorsRestricted public {
        appointments.push(concat(concat(doctor, ' '), date));
        string memory appointment = string(concat(concat(doctor, ' '), date));
        for(uint i = 0; i < appointments.length; i++){
            if(keccak256(appointments[i]) == keccak256(appointment)){
                uint loc = i;
                 break;
            }
        }
        removeAppointmentsAtIndex(loc);
    }
    
    function getAppointmentLen() public view allowedDoctorsRestricted returns(uint){
        return appointments.length;
    }
    
    function getAppointment(uint i) public view allowedDoctorsRestricted returns(string memory){
        return appointments[i];
    }
    
    
    
    
    
    string[] private ipfsHashMedicalReports;
    
    function setHashMedicalReports(string  x) allowedDoctorsRestricted public {
        ipfsHashMedicalReports.push(x); 
        
    }
    
    function getHashSizeMedicalReports() allowedDoctorsRestricted public view returns (uint) {
        return ipfsHashMedicalReports.length; 
    }
    
    function getHashMedicalReports(uint index) allowedDoctorsRestricted public view returns (string memory) {
        return ipfsHashMedicalReports[index]; 
    }
    
    string[] private ipfsHashPrescription;
    
    function setHashipfsHashPrescription(string  x) allowedDoctorsRestricted public {
        ipfsHashPrescription.push(x); 
        
    }
    
    function getHashSizeipfsHashPrescription() allowedDoctorsRestricted public view returns (uint) {
        return ipfsHashPrescription.length; 
    }
    
    function getHashipfsHashPrescription(uint index) allowedDoctorsRestricted public view returns (string memory) {
        return ipfsHashPrescription[index]; 
    }
    
    
}