<template>
    <div>
        <div class="ay_content">
        <div class="newadd_table" v-if="flag">
            <el-table :data="yh_tableData" style="width: 100%" :header-cell-style="{background:'#27B6C7',color:'#ffffff'}">
                <el-table-column prop="xh" label="序号" min-width="15%" align="center"></el-table-column>
               <!-- <el-table-column prop="ryid" label="人员ID" min-width="15%" align="center"></el-table-column>-->
                <el-table-column prop="xm" label="监察员" min-width="15%" align="center"></el-table-column>
                <el-table-column label="监察员证号" min-width="20%" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.jczh?scope.row.jczh:"--" }}</span>
                </template> 
                </el-table-column>
                <el-table-column label="状态" min-width="15%" align="center">
                    <template slot-scope="scope" align="center">
                    <span>{{ scope.row.sfky==1?'启用':"禁用"}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="20%" align="center">
                    <template slot-scope="scope" align="center">
                    <el-button
                        type="primary"
                        size="mini"
                        @click="qyjy(scope.row)"
                        v-if="scope.row.sfky=='0'"
                    >启用</el-button>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="qyjy(scope.row)"
                        v-if="scope.row.sfky=='1'"
                    >禁用</el-button>
                    <el-button type="primary" class="xgbtn" size="mini" @click="yhxg(scope.$index)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--弹出框-->
        <el-dialog :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" status-icon ref="form">
            <!--<el-form-item label="人员ID" :label-width="formLabelWidth">
                <el-input v-model="form.ryid" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>-->
            <el-form-item label="监察员" :label-width="formLabelWidth">
                <el-input v-model="form.xm" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="监察员证号"  prop="jczh"  :label-width="formLabelWidth">
                <el-input v-model="form.jczh" autocomplete="off"></el-input>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="qxBj()">取 消</el-button>
            <el-button type="primary" @click="yhSave()">确 定</el-button>
            </div>
        </el-dialog>
        <!--分页-->
        <!--total共多少条,current-change改变触发，pageNum当前页，pageSize一页几个-->
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            layout=" prev, pager, next, total"
            :total="total"
            :page-size="pageSize"
            prev-text="上一页"
            next-text="下一页"
            v-if="this.total !== 0"
        ></el-pagination>
        </div>
    </div>
</template>
<script>
import $ from "@/common/js/axios";
import { validator } from "@/common/js/valid";
    export default {
        data() {
            return {
                total:0,
                pageSize:12,
                pageNum: 1,
                dialogFormVisible: false,
                formLabelWidth: "90px",
                yh_tableData: [],
                form: {
                    ryid: " ",
                    xm:"",
                    jczh:""
                },
                rules: {jczh: [{ validator: validator("14, \"full\", \"监察证号\", false") }] },
                flag:false
            };
        },     
        methods: {  
            // 分页的相关方法
            handleCurrentChange(val) {
                this.pageNum = val;
                this.yhData(val);
            },          
            // 显示数据
            yhData(num){            
                const pageNum = num || this.pageNum;
                this.LoadOn();
                $.get("/yhgl/dcrbac", {
                    params: {
                        "pageNum": pageNum
                    }
                    }).then((result) => {
                this.LoadClose();
                    var _res = result.returnData;
                    if (+_res.executeResult == 1) {    
                        this.yh_tableData=result.returnData.jcyxx;
                        this.total = parseInt(result.rowsCount);
                        this.flag=true;                                     
                    } else {
                        this.$message({
                            type: "info",
                            message: "数据错误，请刷新重试"
                        });
                    }
                }).catch(() => { });
            }, 
            // 启用禁用
            qyjy(item){
                $.post("/yhgl/qyjy", {
                    "ryid":item.ryid,
                    "sfky":(item.sfky==1?"0":"1")
                }).then((result) => {
                    var _res = result.returnData;
                    if (+_res.executeResult == 1) {  
                        this.yhData();                      
                    } else {      

                    }
                }).catch(() => { });
            },       
            // 修改
            yhxg(index) {
                this.form.ryid = this.yh_tableData[index].ryid;
                this.form.xm = this.yh_tableData[index].xm;
                this.form.jczh = this.yh_tableData[index].jczh;
                this.dialogFormVisible = true;
            },
            // 取消修改
            qxBj() {
                this.dialogFormVisible = false;
            },
            // 弹出框保存
            yhSave(){
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        // this.$confirm("是否保存", "提示", {
                        //     confirmButtonText: "确定",
                        //     cancelButtonText: "取消",
                        //     type: "success"
                    // }).then(() => {
                        this.dialogFormVisible = false;              
                        $.post("/yhgl/xxxg", {
                            "ryid":this.form.ryid,
                            "jczh":this.form.jczh
                        }).then((result) => {
                            var _res = result.returnData;
                            if (+_res.executeResult == 1) {
                                    this.$message({
                                        type: "success",
                                        message: "操作成功!"
                                    });
                                    this.yhData();
                            } else {
                                this.$message({
                                    type: "info",
                                    message: "操作失败"
                                });
                            }
                        }).catch(() => { });
                    // })
                    }
                });
            }
        },
    created: function() {
        // 显示数据
        this.yhData();
    }
    };
</script>
<style scoped>
    .newadd {
        width: 80px;
        height: 30px;
        background: #0a9daf;
        opacity: 0.9;
        border-radius: 4px;
        text-align: center;
        color: #fff;
        line-height: 30px;
        float: left;
        cursor: pointer;
        margin-bottom: 20px;
    }
    .newadd_table {
        margin-top: 20px;
    }
    .ay_content{
        margin: 0;
        padding: 30px 20px 30px 20px;
        background-color: #ffffff;
        min-height:620px;
    }
    /*分页*/
    .el-pagination {
        text-align:center;
        padding: 40px 0;
    }
    .xgbtn {
        margin-top: 5px;
        margin-left: 10px; 
    }
</style>