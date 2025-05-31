// Hàm tính số mili giây giữa hai ngày
function getCountdownTime(futureDate) {
  const now = new Date();
  const distance = futureDate - now;

  if (distance <= 0) return "🎉 Đã đến ngày lễ!";

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
}

// Chuyển định dạng "dd-mm" thành Date object trong năm hiện tại
function parseDuongLich(ngayThang) {
  const [day, month] = ngayThang.split("-").map(Number);
  const now = new Date();
  let year = now.getFullYear();
  const targetDate = new Date(year, month - 1, day);

  // Nếu ngày đó đã qua rồi trong năm nay, thì lấy sang năm sau
  if (targetDate < now) {
    return new Date(year + 1, month - 1, day);
  }
  return targetDate;
}

// Tải dữ liệu lễ từ JSON
async function loadLe() {
  const res = await fetch("le_full.json");
  const list = await res.json();

  // Lấy danh sách lễ dương lịch
  const duongLe = list.filter(le => le.loai === "duong");

  // Tìm ngày lễ gần nhất (dương lịch)
  const now = new Date();
  let leGanNhat = null;
  let ngayGanNhat = null;

  duongLe.forEach(le => {
    const leDate = parseDuongLich(le.ngay);
    if (!ngayGanNhat || leDate < ngayGanNhat) {
      ngayGanNhat = leDate;
      leGanNhat = le;
    }
  });

  if (leGanNhat) {
    document.getElementById("ten-le").textContent = `🎉 Sắp đến: ${leGanNhat.ten}`;
    document.getElementById("loi-chuc").textContent = leGanNhat.chuc;

    const countdownEl = document.createElement("p");
    countdownEl.id = "countdown";
    document.querySelector(".card").appendChild(countdownEl);

    // Cập nhật liên tục mỗi giây
    setInterval(() => {
      countdownEl.textContent = "⏳ Còn lại: " + getCountdownTime(ngayGanNhat);
    }, 1000);
  }
}

loadLe();
