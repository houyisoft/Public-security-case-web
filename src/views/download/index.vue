<!--  -->
<template>
    <div class>
        <object ref="kodaPlugin" type="application/x-sfplayplugin" width="0" height="0"></object>
    </div>
</template>

<script>
import Apis from "@/apis/download/download.js";
export default {
    components: {},
    data() {
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.Koda = this.$refs["kodaPlugin"];
        if (!this.Koda.valid) {
            alert("插件运行错误！请检查");
        }
    },
    methods: {
        getDownloadList() {
            Apis.getDownloadList().then(res => {
                SavePath = res.data.path;
                for (let jn in res.data.DataList) {
                    let recCmd = {
                        docomd: {
                            cmd: "getrecord",
                            data: {
                                type: 1,
                                // 'domain': ,
                                starttime: res.data.DataList[jn].starttime,
                                endtime: res.data.DataList[jn].endtime,
                                chnid: res.data.DataList[jn].chn,
                                puid: res.data.DataList[jn].puid
                            }
                        },
                        puid: res.data.DataList[jn].puid,
                        chn: res.data.DataList[jn].chn,
                        personId: res.data.DataList[jn].PersonId,
                        Id: res.data.DataList[jn].Id
                    };
                    //生成通道列表
                    queryRecordList.push(recCmd);
                }
                this.GoDown(queryRecordList);
            });
        },
        doDown() {
            let queryRecordList = [];
            //获取登录信息
            $.ajax({
                url: "http://localhost:20873/KDDown/GetListInfo",
                data: {},
                type: "get",
                dataType: "json",
                success: function(res) {
                    if (res.code == 200) {
                        SavePath = res.data.path;
                        for (let jn in res.data.DataList) {
                            let recCmd = {
                                docomd: {
                                    cmd: "getrecord",
                                    data: {
                                        type: 1,
                                        starttime:
                                            res.data.DataList[jn].starttime,
                                        endtime: res.data.DataList[jn].endtime,
                                        chnid: res.data.DataList[jn].chn,
                                        puid: res.data.DataList[jn].puid
                                    }
                                },
                                puid: res.data.DataList[jn].puid,
                                chn: res.data.DataList[jn].chn,
                                personId: res.data.DataList[jn].PersonId,
                                Id: res.data.DataList[jn].Id
                            };
                            //生成通道列表
                            queryRecordList.push(recCmd);
                        }
                        this.GoDown(queryRecordList);
                    }
                }
            });
        },
        //更新、保存数据
        UpdateAndSaveFile(keyValue, PersonId, SavePath, FileName) {
            $.ajax({
                url: "http://localhost:20873/KDDown/SaveFileInfo",
                headers: { __RequestVerificationToken: $.lrToken },
                data: {
                    keyValue: keyValue,
                    PersonId: PersonId,
                    SavePath: SavePath,
                    FileName: FileName
                },
                type: "post",
                dataType: "json",
                success: function(res) {}
            });
        },

        //设置用户登录信息，登录
        setPlatInfo() {
            $.ajax({
                url: "http://localhost:20873/KDDown/GetLoginInfo",
                data: {},
                type: "get",
                dataType: "json",
                success: function(res) {
                    let loginInfo = res.data;
                    LoginCmd = {
                        cmd: "setplatforminfo",
                        data: {
                            ip: loginInfo.Ip,
                            port: loginInfo.Port,
                            user: loginInfo.UserName,
                            pwd: loginInfo.PW,
                            type: 0
                        }
                    };
                    if (!LoginCmd) return;
                    let ret = this.Koda.PostCmd(JSON.stringify(LoginCmd));
                    ret = JSON.parse(ret);
                    if (ret.code == 0) {
                    }
                }
            });
        },

        //查询通道视频信息
        queryRec(recListCmd) {
            records = [];
            let ret = this.Koda.PostCmd(JSON.stringify(recListCmd));
            return ret;
        },
        //执行登录、下载视频
        downloadRecord() {
            //后台查询数据
            this.doDown();
        },

        GoDown(queryRecordList) {
            if (queryRecordList.length > 0) {
                //根据通道信息列表，获取视频记录列表
                for (let recListCmd in queryRecordList) {
                    //执行查询记录信息,Notify自动返回data数据
                    let retcode = this.queryRec(
                        queryRecordList[recListCmd].docomd
                    );
                    let QueryRecord = queryRecordList[recListCmd].docomd;
                    setTimeout(function() {
                        if (records.length > 0) {
                            //循环视频记录列表，生成执行cmd
                            for (let record in records) {
                                let filename =
                                    QueryRecord.personId +
                                    "_" +
                                    QueryRecord.puid +
                                    "_" +
                                    Date.now() +
                                    ".mp4";
                                let path = SavePath + "\\" + filename;
                                let cmd = {
                                    cmd: "startdownloadrecord",
                                    data: {
                                        path: path,
                                        starttime: record.starttime,
                                        endtime: record.endtime,
                                        type: 0
                                    }
                                };
                                //开始下载
                                let re = this.doDownload(cmd);
                                re = JSON.parse(re);
                                if (re.code != 0) {
                                    this.UpdateAndSaveFile(
                                        QueryRecord.Id,
                                        QueryRecord.personId,
                                        SavePath,
                                        filename
                                    );
                                    console.log("下载失败");
                                } else {
                                    console.log("下载成功");
                                }
                            }
                        }
                    }, 3000);
                    //更新数据
                    setTimeout(function() {
                        //执行插入修改信息
                        this.UpdateAndSaveFile(
                            queryRecordList[recListCmd].Id,
                            queryRecordList[recListCmd].personId,
                            SavePath,
                            ""
                        );
                        console.log("修改数据");
                    }, 2000);
                }
            }
        },
        //下载视频
        doDownload(cmd) {
            let ret = this.Koda.PostCmd(JSON.stringify(cmd));

            return ret;
        },
        //获取下载结果
        onStartDownload(notify) {
            if (notify.code != 0) {
                alert("下载录像失败！");
            }
        },
        //获取下载进度
        onDownloadProgress(notify) {
            if (notify.data.progress == 100) {
                this.stopDownloadRecord();
            }
        },
        //根据 notify返回的查询通道信息，将视频列表数据添加到records中
        onRecordList(notify) {
            if (notify.code == 0) {
                if (!notify.data) return;
                if (Array.isArray(notify.data.records)) {
                    records = records.concat(notify.data.records);
                }
            }
        },

        stopDownloadRecord() {
            let cmd = {
                cmd: "stopdownloadrecord"
            };

            let ret = this.Koda.PostCmd(JSON.stringify(cmd));
            $.ajax({
                url: "http://localhost:20873/KDDown/SaveFinishInfo",
                headers: { __RequestVerificationToken: $.lrToken },
                data: {
                    keyValue: keyValue,
                    PersonId: PersonId,
                    SavePath: SavePath,
                    FileName: FileName
                },
                type: "post",
                dataType: "json",
                success: function(res) {}
            });
        },

        KDLogin() {
            $.ajax({
                url: "http://localhost:20873/KDDown/GetLoginInfo",
                data: {},
                type: "get",
                dataType: "json",
                success: function(res) {
                    let loginInfo = res.data;
                    LoginCmd = {
                        cmd: "setplatforminfo",
                        data: {
                            ip: loginInfo.Ip,
                            port: loginInfo.Port,
                            user: loginInfo.UserName,
                            pwd: loginInfo.PW,
                            type: 0
                        }
                    };
                    if (!LoginCmd) return;
                    let ret = this.Koda.PostCmd(JSON.stringify(LoginCmd));
                    if (ret.code == 0) {
                    }
                }
            });
        },

        devices() {
            requestDeviceGroups = Object.keys(id2Groups);

            id2Devices = {};
            this.requestDevices();
        },
        requestDevices() {
            if (requestDeviceGroups.length == 0) {
                btnStates.disabled = false;
                btnUnStates.disabled = false;

                domTotal.innerHTML = this.getDeviceTotalCount();
                domOnline.innerHTML = this.getDeviceOnlineCount();
                return;
            }

            groupToRequest = requestDeviceGroups.shift();
            group2Devices[groupToRequest] = [];

            let cmd = {
                cmd: "getdevice",
                data: {
                    groupid: groupToRequest
                }
            };

            let ret = pluginPlatform.PostCmd(JSON.stringify(cmd));
        }
    }
};
</script>
<style lang='scss' scoped>
</style>