<template>
  <div>
      <div class="recycle">
        <div class="list">
          <delete-file :info="item" v-for="item in list" :key="item.id"></delete-file>
        </div>
      </div>
  </div>
</template>

<script>
import DeleteFile from "../../components/DeleteFile.vue"
import { getRecycleList } from "../../api/recycle";
export default {
  data(){
    return {
      list:[],
      bread:[],
      currentFolderId:''
    }
  },
  components:{
    DeleteFile
  },
  methods:{
    getRecyclebin(){
      getRecycleList().then(res =>{
        if(res.code === 0){
          this.list = [...res.data]
        }
      })
    }
  },
  mounted(){
    this.getRecyclebin()
    this.$bus.$on('getrecyclelist',this.getRecyclebin)
  },
}
</script>

<style lang="scss" scoped>
.list{
  display: flex;
  flex-wrap:wrap;
}
</style>