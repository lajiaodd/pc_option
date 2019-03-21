<template>
    <div class="upload">
		<div class="rz-picter">
            <img :src="avatar_later" class="avatar-later" v-if="avatar_later">
            <img :src="avatar" class="img-avatar" v-else>
            <input type="file" name="avatar" id="uppic" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)" ref="avatarInput" class="uppic">
		</div>
    </div>
</template>


<script>
export default {
    name: 'upload',
    data() {
      return {
            avatar: require('../../assets/images/add_pic.png'),
            maxSize: 20, //图片上传不能上传超过20M
      }
    },
    props: {
        avatar_later:''
    },
    computed: {
    
    },
    methods: {
        changeImage(e) {
            let app = this
            var file = e.target.files[0]
            let size = file.size/1024/1024 
            if(size > app.maxSize) {
                app.$Message.success(`图片大小不能超过${app.maxSize}M`)
                return
            }
            var reader = new FileReader()
            var that = this
            reader.readAsDataURL(file)
            reader.onload = function(e) {
                // that.avatar_later = this.result
                that.$emit('upload', this.result, file)
            }
        },
    }
}
</script>

<style  scoped>
.rz-picter {
		height: 100px;
		width: 200px;
		margin: 10px 0px;
		border: 0px solid #ededed;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
.avatar-later{
  position: absolute;
  height: 100px;
  width: 200px;
}
.uppic {
  height: 100px;
  width: 200px;
  margin: 0 auto;
  opacity: 0;
  z-index: 99999;
}
.img-avatar {
  position: absolute;
  width: 1rem;
}
</style>
