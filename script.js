const proxyUrl = 'https://script.google.com/macros/s/AKfycbygYrWQZoHJlfEA8hpgiK-ODwzu3FmoEKC51uW_BrzGFnMfkEzmNcx_u5FYHNOgOldC/exec';
const botToken = '7945913782:AAEH8_nwqQeMMxHYRqg1u6yuEwDzGXlq9pM';
const groupId = -1002434982879;

let countdown = 60; // 60s

async function fetchGia() {
    try {
        const res = await fetch(proxyUrl + '?url=' + encodeURIComponent('https://api.telegram.org/bot' + botToken + '/getUpdates'));
        const data = await res.json();
        const messages = data.result.reverse();

        let giaCaPhe = "Không tìm thấy dữ liệu.";
        let giaTieu = "Không tìm thấy dữ liệu.";

        for (let msg of messages) {
            if (msg.message && msg.message.chat && msg.message.chat.id === groupId) {
                const text = msg.message.text || "";

                if (text.toLowerCase().includes('giá cà phê') && giaCaPhe === "Không tìm thấy dữ liệu.") {
                    giaCaPhe = text.replace(/\n/g, '<br>');
                }

                if (text.toLowerCase().includes('giá tiêu') && giaTieu === "Không tìm thấy dữ liệu.") {
                    giaTieu = text.replace(/\n/g, '<br>');
                }
            }
        }

        document.getElementById('giaCaPhe').innerHTML = giaCaPhe;
        document.getElementById('giaTieu').innerHTML = giaTieu;

        const now = new Date();
        const timeStr = now.toLocaleTimeString('vi-VN');
        document.getElementById('timeCaPhe').innerText = "Cập nhật lúc: " + timeStr;
        document.getElementById('timeTieu').innerText = "Cập nhật lúc: " + timeStr;

        countdown = 60; // Reset đếm ngược sau mỗi lần tải thành công

    } catch (e) {
        console.error(e);
        document.getElementById('giaCaPhe').innerText = 'Lỗi tải dữ liệu!';
        document.getElementById('giaTieu').innerText = 'Lỗi tải dữ liệu!';
    }
}

// Hàm cập nhật đếm ngược mỗi giây
function startCountdown() {
    setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            fetchGia();
            countdown = 60;
        }
        // Cập nhật thời gian còn lại trên giao diện
        document.getElementById('countdown').innerText = `⏳ Tự động làm mới sau: ${countdown}s`;
    }, 1000);
}

// Khi trang load
fetchGia();
startCountdown();