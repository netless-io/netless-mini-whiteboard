var sdkToken = "WHITEcGFydG5lcl9pZD1OZ3pwQWNBdlhiemJERW9NY0E0Z0V3RTUwbVZxM0NIbDJYV0Ymc2lnPWNiZWExOTMwNzc1NmQyNmU3N2U3M2Q0NWZjNTZiOGIwMWE2ZjU4NDI6YWRtaW5JZD0yMTYmcm9sZT1hZG1pbiZleHBpcmVfdGltZT0xNTg5ODMzNTQxJmFrPU5nenBBY0F2WGJ6YkRFb01jQTRnRXdFNTBtVnEzQ0hsMlhXRiZjcmVhdGVfdGltZT0xNTU4Mjc2NTg5Jm5vbmNlPTE1NTgyNzY1ODg4NDQwMA";
var url = 'https://cloudcapiv4.herewhite.com/room?token=' + sdkToken;
var requestInit = {
    method: 'POST',
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify({
        name: '我的第一个 White 房间',
        limit: 100, // 房间人数限制
    }),
};

// 请求创建房间
// 网络请求部分逻辑，请在服务器实现
fetch(url, requestInit).then(function (response) {
    // Step1: 服务器返回房间唯一标识 uuid 和 进入房间的秘钥 roomToken
    return response.json();
}).then(function (json) {
    // Step2: 加入房间
    return initAndJoinRoom(json);
}).then(function (room) {
    // Step3: 加入成功后想白板绑定到指定的 dom 中
    bind(room);
}).catch(function (err) {
    console.log(err);
});

// 加入房间
function initAndJoinRoom(json) {
    // 初始化 SDK，初始化 SDK 的参数，仅对本地用户有效，默认可以不传
    var whiteWebSdk = new WhiteWebSdk({
        // 用户手动进行缩放操作时的上下限，默认 为 0.1~10。
        // 缩放 API 不受影响
        zoomMaxScale: 3,
        zoomMinScale: 0.3,
        // 图片替换 API，可以在插入图片和创建新场景背景图时，替换传入的 url。
        // 如果没有需要，请不要传入，可以减少前端资源开销
        // 使用该 API 后，服务器截屏时，会使用原始图片地址
        urlInterrupter: url => url,
        deviceType: "touch"
    });
    return whiteWebSdk.joinRoom({
        // 这里与
        uuid: json.msg.room.uuid,
        roomToken: json.msg.roomToken,
    });
}

// 将白板绑定在一个元素上
function bind(room) {
    room.bindHtmlElement(document.getElementById('whiteboard'));
}