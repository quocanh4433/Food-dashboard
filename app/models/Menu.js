export class Menu {

    arrMonAn = [];

    constructor () {

    }

    themMon = (monAn) => {
        this.arrMonAn.push(monAn)
    }

    layThongTinMonAn = (maMon) => {
        // Tương tự findindex => hàm find trả về đối tượng (phần tử) trong mảng thỏa điều kiện của arrow function
        let monAn = this.arrMonAn.find(objectMonAn => objectMonAn.maMon == maMon);

        if (monAn) {
            return monAn
        } else {
            return undefined
        }
    } 

    xoaMonAn = (maMon) => {
        // Muốn xóa 1 phần tử phải tìm ra index của phần tử đó 
        // arr.splice(index,1)

        let index = this.arrMonAn.findIndex((monAn) => monAn.maMon == maMon)
        // Nếu tìm thấy trả về vị trí nếu không tìm thấy trả về -1
        if (index != -1) {
            this.arrMonAn.splice(index, 1);
        }
    } 

    capNhatMonAn = (ma, monAnCapnhat) => {
        let monAn = this.arrMonAn.find(objectMonAn => objectMonAn.maMon == ma)

        if (monAn) {
            // Cách 1 cập nhật từng giá trị
            // monAn.tenMon = monAnCapnhat.tenMon;
            // monAn.giaMon = monAnCapnhat.giaMon

            // Cách 2: duyệt từng thuộc tính động es6
            for (let keyMonAn in monAn) {
                monAn[keyMonAn] = monAnCapnhat[keyMonAn]
            } 
        }

    }

    taoMenu = () => {
        // map là hàm tạo ra 1 mảng mới từ mảng ban đầu
        let arrayResult = this.arrMonAn.map((monAn, index) => {
            return `
                <tr>
                    <td>${monAn.maMon}</td>
                    <td>${monAn.tenMon}</td>
                    <td>${monAn.loaiMon == "loai1" ? 'Chay' : 'Mặn'}</td>
                    <td>${monAn.giaMon}</td>
                    <td>${monAn.khuyenMai}</td>
                    <td>Giá khuyến mãi</td>
                    <td>${monAn.tinhTrang == 0 ? 'Hết' : 'Còn'}</td>
                    <td>
                        <button class="btn btn-success xoa"  onclick="xoaMonAn(${monAn.maMon})">Xóa</button>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="chinhSuaMonAn(${monAn.maMon})">Chỉnh sửa</button>
                    </td>
                </tr>
            `
        })
        return arrayResult;
    }

    renderMenu = (idTable) => {
        let arrHtmlmenu = this.taoMenu();
        let content = "";
        // foreach (phần tử trong mảng, chỉ số của phần tử trong mảng)
        arrHtmlmenu.forEach((htmlMenu, index) => {
            content += htmlMenu
        })
        document.getElementById(idTable).innerHTML  = content;
    }

    luuStorage () {
        // Biến dữ iệu arrMenu thành chuỗi
        let stringMenu = JSON.stringify(this.arrMonAn);

        // Lưu vào localstorage
        localStorage.setItem('danhSachMonAn', stringMenu)
    }

    layStorage () {
        // Kiểm tra trong storage có dữ liệu thì lấy ra gán cho menu

        if (localStorage.getItem("danhSachMonAn")){
            let stringMenu = localStorage.getItem("danhSachMonAn")

            // Giá trị trog localstorage cho stringMenu
            this.arrMonAn = JSON.parse(stringMenu)

        }
    }
}