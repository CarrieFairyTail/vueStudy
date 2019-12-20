<template>
  <div id="timeStep">
    <div class="datePro">
      <div class="dateProInner" v-for="(item, k) in week" :key="k">
        <div class="unTriangle"></div>
        <div :class="['dateItem', 'dateItem'+k]" :ref="'dateItem'+k">
          <div class="dateInner" v-for="(t, n) in week[k]" :key="n">
            <div class="dateCircle" v-if="notes.some(item => {if (item.date === t.toLocaleDateString()) { return true; } })">
              <div class="dateCirInner">
                <div class="dateTree"></div>
                <div class="dateNote">
                  <div style="color: #666">{{t.toLocaleDateString()}}</div>
                  <div v-for = "(item, i) in notes" :key="i">
                    <div class="dateNoteInner" v-if="item.date === t.toLocaleDateString()">
                      <span v-for = "(t, i) in item.note" :key="i">
                        {{t.value}}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div :class="['Triangle', 'Triangle'+k]" :ref="'Triangle'+k" @mousedown="changeWidth(k)"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "timeStep",
    data() {
      return{

      }
    },
    props: {
      week: {
        type: Array,
        default: () => []
      },
      notes: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      // 拖动更改宽度
      changeWidth(k) {
        let triangle = document.getElementsByClassName("Triangle")[k];
        let dateItem = document.getElementsByClassName("dateItem")[k];
        // let triangle = this.$refs["Triangle"+k]
        // let dateItem = this.$refs["dateItem"+k]
        let e1 = window.event || event;
        // triangle.onmousedown = function (e) {
        let startX = e1.clientX;
        console.log('e:'+JSON.stringify(e1));
        triangle.left = triangle.offsetLeft;
        document.onmousemove = function (e) {
          let endX = e.clientX;
          let moveLen = triangle.left + (endX - startX);
          if(k !== 0) {
            moveLen -= k*180
          }
          dateItem.style.width = moveLen + "px"
        };
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
          triangle.releaseCapture && triangle.releaseCapture();
        };
        triangle.setCapture && triangle.setCapture();
        return false
        // }
      }
    }
  }
</script>

<style scoped>
.Triangle{
  width: 0;
  height: 0;
  border-left: 25px solid #09315B;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  cursor: e-resize
}
.unTriangle{
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-top: 15px solid #09315B;
  border-bottom: 15px solid #09315B
}
.datePro{
  height: 250px;
  margin-top: 70px;
  display: flex;
  justify-content: flex-start
}
.dateProInner{
  display: flex;
  justify-content: flex-start
}
.dateItem{
  min-width: 150px;
  height: 30px;
  background-color: #09315B;
  display: flex;
  justify-content: space-around;
  align-items: center
}
.dateInner{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative
}
.dateCircle{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white
}
.dateCirInner{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center
}
.dateTree{
  width: 3px;
  height: 50px;
  background-color: #09315B;
  margin-top: 10px
}
.dateNote{
  width: 40px;
  color: #999;
  font-size: 13px;
  text-align: center
}
.dateNoteInner{
  width: 40px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
.dateInner:nth-child(even),
.dateCircle,
/*background-color #13ce66*/
.dateCirInner,
/*display flex*/
/*flex-direction column-reverse*/
.dateTree{
  background-color: #09315B;
  position: absolute;
  bottom: 10px
}
/*.dateNote {*/
/*  color: #999999;*/
/*  position: absolute;*/
/*  bottom: 60px*/
/*}*/
.dateProInner:first-child
.unTriangle{
  display: none
}
.dateProInner:not(:first-child){
  margin-left: -15px
}
</style>