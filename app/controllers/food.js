import { Menu } from "../models/Menu.js";
import { MonAn } from "../models/MonAn.js"

// Thay vì sử dụng mảng gay ảnh hưởng đến hiển thị ở trong food-list
// làm cho trang foodlist chỉ hiển thị một món mới nhất khi thêm món mới
// let arrMonAn = []

let menu = new Menu
menu.layStorage();

document.querySelector('#btnThemMon').onclick = () => {

    // Tạo đối tượng chứa thông in người dùng nhập vào
    let monAn = new MonAn();

    let arrtagInput = document.querySelectorAll('form input, form select, form textarea')
    for (let input of arrtagInput){
        let {name, value} = input
        // Gán giá trị value đưa vào thuộc tính name
        monAn[name] = value;
        // monAn = { ... monAn, [name]:value}
    }



    // //--------------------------------------------------
    // // CÁCH 1: dùng queryslector + name
    // // -------------------------------------------------
    // let arrTagOutPut = document.querySelectorAll('.list-group-item span, .list-group-item p') 
    // for (let tag of arrTagOutPut) {
    //     // Đối với 1 số thẻ không có thuộc tính name 
    //     // vi du: thẻ span sẽ không có thuộc tính name. Vậy để lây attrbute nem của thẻ span cần làm gì?
    //     // Để lấy attribute mà thẻ đó không có sẽ dùng getAttribute('...tên attribue...')
    //     let name = tag.getAttribute('name') ;

    //     if (name === 'giaSauKhuyenMai') {
    //         tag.innerHTML = monAn.tinhGiaKhuyenMai();
    //     } else if (name == "loaiMon") {
    //         tag.innerHTML = monAn[name] === "loai1"? 'Chay' : 'Mặn'
    //     }
    //     else if (name == "tinhTrang") {
    //         tag.innerHTML = monAn[name] === "0"? 'Hết' : 'Còn'
    //     } 
    //     else {
    //         tag.innerHTML = monAn[name];
    //     }
    //     // tag.innerHTML = monAn[name];
    // }
    // // document.querySelector('#imgMonAn').src = monAn.hinhAnh
    // // Hoặc sử dụng cách
    // document.querySelector('#imgMonAn').src = monAn['hinhAnh']


    //--------------------------------------------------
    // CÁCH 2: dùng hướng đối tượng
    // -------------------------------------------------
    document.querySelector("#card-body").innerHTML = monAn.hienThiThongTin();


    // Thêm món ăn

    // Cách 1: viết theo hàm
    // menu.arrMonAn.push(monAn);

    // cách 2: viết theo đối tượng
    menu.themMon(monAn);
    menu.luuStorage();
    localStorage.setItem('danhSachMonAn', JSON.stringify(arrMonAn))

}

// let sinhvien = {ma: 1, ten: "Nguyen"}
// sinhvien.ten = "Hau"
// sinhvien.['ten'] = "Hau"
// sinhVien = {...sinhVien, [ten]: "Hau"}
// sinhVien = {... sinhVien, ['ten']: "Hau"}