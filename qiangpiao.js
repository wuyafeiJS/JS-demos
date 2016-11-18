/**
 * Created by Administrator on 2016/11/18.
 */
flag = 0;
function X(){
    if( flag==1 ) return;
    // 请求参数
    var bR = {
        "leftTicketDTO.train_date": "2016-11-17",
        "leftTicketDTO.from_station": $("#fromStation").val(),
        "leftTicketDTO.to_station": $("#toStation").val(),
        purpose_codes: "ADULT"
    };
    jQuery.ajax({
        type: "get",
        isTakeParam: false,
        beforeSend: function(bT) {
            bT.setRequestHeader("If-Modified-Since", "0");
            bT.setRequestHeader("Cache-Control", "no-cache")
        },
        url: "https://kyfw.12306.cn/otn/leftTicket/queryX",
        data: bR,
        timeout: 450,
        success: function(bV) {
            if (bV.status) {
                console.log(bV.data);
                var d = bV.data[3];
                if( d.secretStr!='' ){
                    // 播放声音
                    jQuery('#tryPlayer').click();
                    flag = 1;
                    // 弹窗
                    alert('got it!');
                    // 提交订单
                    submitOrderRequest(d.secretStr);
                }
            }
        }
    });
}

setInterval(function(){X();}, 500);