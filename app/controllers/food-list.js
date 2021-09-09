import {Menu} from "../models/Menu.js"
import { MonAn } from "../models/MonAn.js";
// Get data storage

// Thay vì chứa trong array
// let arrMonAn = [];

// Sẽ thay bằng chưa trong đối tượng
let menu = new Menu();

// ##01.Lấy dữ liệu đã lưu vào localstore
let getDataStorage = () => {
    if (localStorage.getItem('danhSachMonAn')) {
        menu.arrMonAn = JSON.parse(localStorage.getItem('danhSachMonAn'))
    }
}
getDataStorage();

// ##02. Đưa dữ liệu từ localstore lên giao diện
menu.renderMenu("tbodyFood")


/*
Tai sao sử dụng window.xoaMonAn() ?

01. Vì dữ liệu động nên không thể DOM băng id. 

02. Vì cũng không DOM bằng class vì cần chạy thêm vòng lặp để kiểm tra maMon của món ăn cần xóa

03. window bao hàm các toàn bộ document nên có thể gọi bất kỳ lúc nào
*/

let classbtn = document.querySelectorAll(".xoa")
console.log({classbtn})

window.xoaMonAn = function (maMon) {
    menu.xoaMonAn(maMon);
    menu.renderMenu('tbodyFood');
    menu.luuStorage()
}

window.chinhSuaMonAn = function (maMon) {
    // Cho hàm này xử lí load thông tin của món lên giao diện
    let monAn = menu.layThongTinMonAn(maMon);
    if (monAn) {
        // Load dữ liệu lên popup
        let arrInput = document.querySelectorAll("#foodForm input, #foodForm select, #foodForm textarea")

        for (let input of arrInput) {
            let name = input.getAttribute('name');
            input.value = monAn[name]
        }
    }
}

document.querySelector('#btnCapNhat').onclick = () => {
    let monAnCapnhat = new MonAn();

    let arrInput = document.querySelectorAll("#foodForm input, #foodForm select, #foodForm textarea");

    for (let input of arrInput) {
        let name = input.getAttribute('name');
        let value = input.value;
        monAnCapnhat[name] = value;
    }

    menu.capNhatMonAn(monAnCapnhat.maMon, monAnCapnhat);
    menu.renderMenu("tbodyFood");

    // Tắt popup và lưu vaog localstore
    document.querySelector('.btn-secondary').click();
    menu.luuStorage()
}