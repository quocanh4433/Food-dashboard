import {Menu} from "../models/Menu.js"
import { MonAn } from "../models/MonAn.js";
// Get data storage

// Thay vì chứa trong array
// let arrMonAn = [];

// Sẽ thay bằng chưa trong đối tượng
let menu = new Menu();


let getDataStorage = () => {
    if (localStorage.getItem('danhSachMonAn')) {
        menu.arrMonAn = JSON.parse(localStorage.getItem('danhSachMonAn'))
    }
}

getDataStorage();
menu.renderMenu("tbodyFood")

window.xoaMonAn = function (maMon) {
    menu.xoaMonAn(maMon);
    menu.renderMenu('tbodyFood');
    menu.luuStorage()
}

window.chinhSuaMonAn = function (maMon) {
    // Trò hàm này xử lí load thông tin của món lên giao diện
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

    // Tắt popup khi cập nhật
    document.querySelector('.btn-secondary').click();
    menu.luuStorage()
}