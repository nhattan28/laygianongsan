// Hàm chuyển đổi ngày dương sang âm bằng API miễn phí từ https://amlich.vn/api
async function getLunarDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const url = `https://amlich.vn/api/converter?dd=${day}&mm=${month}&yy=${year}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return `${data.lunarDay.toString().padStart(2, '0')}-${data.lunarMonth.toString().padStart(2, '0')}`;
  } catch (e) {
    return null;
  }
}

async function showLoiChuc() {
  const res = await fetch("le.json");
  const dsLe = await res.json();

  const now = new Date();
  const dd = now.getDate().toString().padStart(2, '0');
  const mm = (now.getMonth() + 1).toString().padStart(2, '0');
  const ngayDuong = `${dd}-${mm}`;

  const ngayAm = await getLunarDate(now);

  const leHomNay = dsLe.find(le =>
    (le.loai === "duong" && le.ngay === ngayDuong) ||
    (le.loai === "am" && le.ngay === ngayAm)
  );

  if (leHomNay) {
    document.getElementById("ten-le").textContent = `🎉 ${leHomNay.ten}`;
    document.getElementById("loi-chuc").textContent = leHomNay.chuc;
  } else {
    document.getElementById("ten-le").textContent = `👋 Hôm nay không có lễ nào`;
    document.getElementById("loi-chuc").textContent = "Chúc bạn một ngày vui vẻ và tràn đầy năng lượng!";
  }
}

showLoiChuc();
