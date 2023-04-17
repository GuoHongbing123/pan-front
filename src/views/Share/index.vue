<template>
<div class="share">
    <el-table :data="list">
        <el-table-column label="名称" prop="realName"></el-table-column>
        <el-table-column label="分享时间" prop="createTime"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary" v-clipboard="scope.row.copyText" v-clipboard:success="onCopy">复制到粘贴板</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
    
</template>

<script>
import { getShareList } from '../../api/share'
import { staticUrl } from '../../const/index'
export default {
    name: 'share',
    data() {
        return {
            list: []
        }
    },
    methods: {
        getList() {
            getShareList().then(res => {
                if (res.code === 0) {
                    this.list = res.data
                    this.list.forEach(element => {
                        element.copyText = `${element.ownerName}向您分享了${element.realName},打开链接后可以进行保存和下载:${staticUrl}/#/s/${element.sharePath} 提取码:${element.code}`
                    });
                }
            })
        },
        onCopy() {
            this.$message.success('复制成功')
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style>

</style>