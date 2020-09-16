export default {
    data() {
        plugin: null
    },
    //初始化视频控件
    methods: {
        initVideo(el, promise, {
            width = 480,
            height = 270
        }) {
            //动态加载object标签
            this.plugin = document.createElement("object");
            this.plugin.setAttribute("id", "plugin0");
            this.plugin.setAttribute(
                "classid",
                "clsid:bea284b6-9db8-547c-975c-77ec7a6b802c"
            );
            this.plugin.setAttribute("width", width);
            this.plugin.setAttribute("height", height);
            this.plugin.setAttribute("type", "application/x-sfplayplugin");
            el.appendChild(this.plugin);


            if (!this.plugin.valid) {
                console.log("插件不可用");
            } else {
                promise.then(res => {
                    if (res.code == 0) {
                        const row = res.rows[0];
                        const {
                            deviceIp: kdPtIp,
                            userName: kdPtUN,
                            password: kdPtPW,
                            puid: puId
                        } = row;
                        this.puId = res.rows[0].puid;

                        //监听插件是否准备完毕
                        addEvent(this.plugin, "Notify", e => {
                            let notify = JSON.parse(e);
                            switch (notify.notify) {
                                case "ready":
                                    //返回ready后执行登陆
                                    var cmd = {
                                        cmd: "setplatforminfo",
                                        data: {
                                            ip: kdPtIp,
                                            port: "80",
                                            user: kdPtUN,
                                            pwd: kdPtPW,
                                            type: "2",
                                            decmode: 1
                                        }
                                    };
                                    console.log("执行登陆");
                                    let ret = this.plugin.PostCmd(
                                        JSON.stringify(cmd)
                                    );
                                    ret = JSON.parse(ret);
                                    //判断是否登录成功！
                                    if (ret.code == 0) {
                                        //如果成功则开始播放视频
                                        console.log("登陆成功");
                                        let cmd1 = {
                                            cmd: "playvideo",
                                            data: {
                                                puid: this.puId,
                                                chnid: 0,
                                                vendor: "kedacom",
                                                hd: 1
                                            }
                                        };
                                        console.log("执行播放");
                                        let ret3 = this.plugin.PostCmd(
                                            JSON.stringify(cmd1)
                                        );
                                        ret3 = JSON.parse(ret3);
                                        if (ret3.code == 0) {
                                            console.log("播放成功");
                                        }
                                    }
                                    break;
                            }
                        });
                    }
                });

            }
        },
        //抓拍
        takePhoto(pathName) {
            return new Promise((resolve, reject) => {
                let cmd = {
                    cmd: "snapshot",
                    data: {
                        path: pathName,
                        pictype: 1,
                        snaptype: 1
                    }
                };
                let ret = this.plugin.PostCmd(JSON.stringify(cmd));
                ret = JSON.parse(ret);

                if (ret.code == 0) {
                    //拍照后延迟 图片才在文件夹内生成。再转换成base64格式图片
                    setTimeout(() => {
                        let src = this.plugin.base64EncodeFile(pathName);
                        let img = "data:image/jpg;base64," + src;
                        resolve(img);
                    }, 2000);
                }
            })
        },
        //摄像头控制
        //0向左, 1 向右,  2 向上,   3向下, 4 左上, 5 左下, 6右上,  7 右下, 9 视野拉近,  10视野拉远,8停止移动, 12复位,
        //210将焦距调远, 211将焦距调近,  212 //自动调焦,213 //调焦停止,  217 //画面调亮,  218 //画面调暗,
        ptzControl(commad) {
            var ret = this.plugin.PostCmd(JSON.stringify({
                cmd: "ptzcontrol",
                data: {
                    puid: this.puId,
                    chnid: 0,
                    range: 3,
                    cmd: commad
                }
            }));
            return (ret = JSON.parse(ret));
        },
        dataURLtoFile(text, fileName) {
            //将base64转换为文件
            var arr = text.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var theBlob = new Blob([u8arr], {
                type: mime
            });
            theBlob.lastModifiedDate = new Date();
            theBlob.name = fileName;
            return theBlob;
        },
    }
}