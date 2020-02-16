<template>
    <div>
        <!-- 导航
        <el-header style="background-color:#F5F5F5;">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:60px">
                <el-breadcrumb-item :to="{ path: '/' }">工作任务</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>抽查事项维护</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>-->
        <div class="ay_content">
            <el-col :span="24">
                <span class="newadd" @click="newAdd">新增</span>
            </el-col>
            <div class="newadd_table" v-if="flag">
                <el-table :data="ay_tableData"  style="width: 100%"  :header-cell-style="{background:'#27B6C7',color:'#ffffff'}">
                    <el-table-column prop="xh" label="序号" min-width="20%" align="center">                       
                    </el-table-column>
                    <el-table-column prop="dmmc" label="名称" min-width="50%" align="center">
                    </el-table-column>
                    <el-table-column label="操作" min-width="30%" align="center">
                        <template slot-scope="scope" align="center">
                            <el-button type="primary" size="mini" @click="edit(scope.$index)">修改</el-button>                        
                            <el-button type="primary" class="scbtn" size="mini" @click="del(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--弹出框-->
            <el-dialog  :visible.sync="dialogFormVisible">
                <el-form :model="form"  :rules="rules" status-icon ref="form">
                    <el-form-item label="名称" prop="name" :label-width="formLabelWidth" required>
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editCancel()">取 消</el-button>
                    <el-button type="primary" @click="editSave">确 定</el-button>
                </div>
            </el-dialog>
            <!--分页-->
            <!--total共多少条,current-change改变触发，pageNum当前页，pageSize一页几个-->
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                layout=" prev, pager, next, total"              
                :total="total"
                :page-size='pageSize'
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
        editIndex: false,
        total: 0,
        pageSize: 12,
        pageNum: 1,
        dialogFormVisible: false,
        formLabelWidth: "80px",
        ay_tableData: [],
        form: {
            name: " "
        },
        rules: {
                name: [{ validator: validator("60, \"full\", \"名称\", false") }],
            },
        flag:false
        };
    },
    methods: {
        // 分页的相关方法
        handleCurrentChange(val) {
        this.pageNum = val;
        this.xsData(val);
    },
    // 显示数据
    xsData(num) {
        const pageNum = num || this.pageNum;
        this.LoadOn();
        $.get("/wh/xxCx", {
            params: {
            flag: "5",
            pageNum: pageNum
            }
        })
            .then(result => {
        this.LoadClose();
            var _res = result.returnData;
            if (+_res.executeResult == 1) {
                this.ay_tableData = result.returnData.vbs;
                this.total = parseInt(result.rowsCount);
                this.flag=true;
            } else {
                this.$message({
                type: "info",
                message: "数据错误，请刷新重试"
                });
            }
        })
        .catch(() => {});
    },
    // 新增
    newAdd() {
        this.editIndex = false;
        this.dialogFormVisible = true;
        this.form.name="";
    },
    // 修改
    edit(index) {
        this.form.name = this.ay_tableData[index].dmmc;
        this.editIndex = index;
        this.dialogFormVisible = true;
    },
    // 保存修改
    editSave() {
        this.$refs["form"].validate(valid => {
            if (valid) {
                    // this.$confirm("是否保存", "提示", {
                    //     confirmButtonText: "确定",
                    //     cancelButtonText: "取消",
                    //     type: "success"
                    // }).then(() => {
                const index = this.editIndex;
                const pushData = { dmmc: this.form.name };
                if (index !== false) {
                    pushData.dmid = this.ay_tableData[index].dmid;
                }
                this.pageNum=1;
                this.communication(pushData);
                this.dialogFormVisible = false;
            }
        });
    },
    // 取消修改
    editCancel() {
        this.editIndex = false;
        this.dialogFormVisible = false;
    },
    // 删除
    del(index) {
        this.$confirm("是否删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            this.editIndex = true;
            const data = {
            dmid: this.ay_tableData[index].dmid,
            sfsc: "1"
            };
        this.communication(data);
        });
    },
    communication(data) {
        data.flag = "5";
        $.post("/wh/xxSave", data)
            .then(result => {
            var _res = result.returnData;
            if (+_res.executeResult == 1) {
                this.$message({
                type: "success",
                message: "操作成功!"
                });
                this.xsData();
            } else {
                this.$message({
                type: "info",
                message: "操作失败"
                });
            }
            })
            .catch(() => {});
        }
    },
    created: function() {
        // 显示数据
        this.xsData();
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
    .scbtn{
        margin-top: 5px;
        margin-left: 10px; 
    }
</style>