function parseDuongLich(ngayThang) {
  const [day, month] = ngayThang.split("-").map(Number);
  const now = new Date();
  let year = now.getFullYear();
  const targetDate = new Date(year, month - 1, day);
  if (targetDate < now) return new Date(year + 1, month - 1, day);
  return targetDate;
}

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

async function loadLe() {
  try {
    const res = await fetch("le.json");
    const list = await res.json();
    const duongLe = list.filter(le => le.loai === "duong");

    const now = new Date();
    let leGanNhat = null;
    let khoangCach = Infinity;

    duongLe.forEach(le => {
      const leDate = parseDuongLich(le.ngay);
      const diff = leDate - now;
      if (diff >= 0 && diff < khoangCach) {
        khoangCach = diff;
        leGanNhat = { ...le, date: leDate };
      }
    });

    if (leGanNhat) {
      // Hiển thị tên lễ và lời chúc
      document.getElementById("ten-le").textContent = `🎉 ${leGanNhat.ten}`;
      document.getElementById("loi-chuc").textContent = leGanNhat.chuc;

      // Tạo phần tử đếm ngược
      const countdownEl = document.createElement("p");
      countdownEl.id = "countdown";

      const tenNgayLe = `${leGanNhat.ten} (${leGanNhat.date.toLocaleDateString("vi-VN")})`;
      countdownEl.innerHTML = `<strong>⏳ Sắp đến:</strong> ${tenNgayLe}<br><span id="clock"></span>`;

      document.querySelector(".card").appendChild(countdownEl);

      // Cập nhật liên tục mỗi giây
      function updateClock() {
        document.getElementById("clock").textContent = getCountdownTime(leGanNhat.date);
      }
      updateClock();
      setInterval(updateClock, 1000);
    }
  } catch (e) {
    console.error("Lỗi tải file lễ:", e);
    document.getElementById("loi-chuc").textContent = "⚠️ Không thể tải dữ liệu lễ.";
  }
}

loadLe();
