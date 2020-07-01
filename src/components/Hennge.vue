<template>
  <div class="container-fluid">
    <div class="row">
      <!-- <input type="text" name="daterange" value="01/01/2018 - 01/15/2018" /> -->

      <div class="form-row col-xl-12">
        <div class="col-12 col-xl-3 date1">
          <div class="input-group">
            <div class="input-group-prepend">
              <span
                class="input-group-text"
                v-bind:style="{backgroundColor: '#fff',borderRightColor: 'white',cursor: 'pointer'}"
                v-on:click="Reset"
                v-bind:class="{ pointer: selectDate2 !== 'd2'}"
              >
                <img src="../assets/icon_calender.svg" width="22px" height="22px" />
              </span>
            </div>
               <v2-datepicker-range v-model='date' v-on:change="getDate" :unlink-panels="true" placeholder="Start Date - End Date" format="YYYY/MM/DD" lang="en"></v2-datepicker-range>
            
            <div class="input-group-append">
              <div
                class="input-group-text"
                v-bind:style="{cursor: 'pointer'}"
                v-on:click="searchDataByDate"
                v-bind:class="{ pointer: selectDate1 === '' || selectDate2 === 'd2'}"
              >
                <img src="../assets/icon_search.svg" width="22px" height="22px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <!-- <DataTable v-bind:propDate="newDate" :arrs="arr" v-bind:selectDate="selectDate1"/> -->
    <div>
      <div class="row">
        <div class="col-sm-2 col-md-3 col-xl-3 text-left">
          <h6 class="results">
            <b>Results:</b><b v-bind:style="{fontSize:'20px'}"> {{arr.length}}</b><b>mail(s)</b>
          </h6>
        </div>
      </div>
       <hr class="hr" v-if="arr.length === 0">
      <div class="logo" v-if="arr.length === 0">
        <img src="../assets/logo.png" />
      </div>
      <!--Start For screen -> md, lg, xl -->
      <div class="d-none d-md-block d-xl-block" v-else-if="arr.length">
        <table class="table table-hover">
          <thead v-bind:style="{background: '#f5f5f5'}">
            <tr>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col"></th>
              <th scope="col">Subject</th>
              <th scope="col"></th>
              <th scope="col" v-on:click="sortByDate" v-bind:style="{cursor:'pointer'}">
                Date
                <img
                  :class="{arrow: !isactive}"
                  src="../assets/icon_arrow01.svg"
                  width="10px"
                  height="10px"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="loop in arr" :key="loop.id" v-bind:style="{fontSize: 'large'}" class="rows-hover">
              <td scope="row">{{loop.email}}</td>
              <td v-bind:style="{width:'30px'}">
                <span v-if="!loop.userId.includes(',')">{{loop.userId.slice(0, loop.userId.length)}}</span>
                <span v-else>{{loop.userId.slice(0, loop.userId.indexOf(','))}},...</span>
              </td>
              <td><span
                  class="rec"
                  v-if="loop.userId.split(',').length > 1"
                  v-on:click="ToggleOpen(loop.id)"
                >+{{loop.userId.split(',').length - 1}}</span>
                <span class="plusData" v-if="selectedId === loop.id && isToggle">
                  {{loop.userId.slice(loop.userId.indexOf(','))}}
                  <span
                   v-bind:style="{cursor:'pointer'}"
                    aria-hidden="true"
                    v-on:click="ToggleOpen(loop.id)"
                  >&times;</span>
                </span></td>
              <td>{{loop.title}}</td>
              <td>
                <a
                  :href="`data:text/json;charset=utf-8,${encodeURIComponent(
  JSON.stringify(loop)
  )}`"
                  download="File.json"
                >
                  <img
                    src="../assets/icon_clip.svg"
                    width="18px"
                    height="18px"
                    v-if="loop.completed"
                  />
                </a>
              </td>
              <td>{{loop.date}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--Start For screen -> xs, sm -->
    <div class="d-sm-block d-md-none d-xl-none" v-bind:style="{textAlign: 'start'}"  v-if="arr.length">
      <div class="row small-screen">
        <hr class="hr3 d-sm-block d-md-none d-xl-none" />

        <span>From</span>
        <span>|</span>
        <span>To</span>
        <span>|</span>
        <span>Subject</span>
        <span>|</span>
        <span v-on:click="sortByDate" v-bind:style="{cursor:'pointer'}">
          Date
          <img
            :class="{arrow: !isactive}"
            src="../assets/icon_arrow01.svg"
            width="9px"
            height="9px"
          />
        </span>
      </div>
      <!-- <hr class="hr2"/> -->
      <div v-for="loop in arr" :key="loop.id">
        <div class="row">
          <hr class="hr2" />

          <div class="col-1">
            <img src="../assets/icon_mail_sp.svg" width="18px" height="48px" />
          </div>
          <div class="col-11">
            <div class="row" v-bind:style="{fontSize: 'large'}">
              <div class="col">
                <h6><b>{{loop.email}}</b></h6>
              </div>
              <div class="col text-right">
                <span><a
                  :href="`data:text/json;charset=utf-8,${encodeURIComponent(
  JSON.stringify(loop)
  )}`"
                  download="File.json"
                >
                  <img
                    src="../assets/icon_clip.svg"
                    width="18px"
                    height="18px"
                    v-if="loop.completed"
                  />
                </a></span>
                <span v-bind:style="{fontSize: 'smaller'}"> {{loop.date}} </span>
                <img src="../assets/icon_arrow02.svg" width="8px" height="8px" />
              </div>
            </div>
            <div class="row" v-bind:style="{fontSize: 'large'}">
              <div class="col">
                <p v-if="!loop.userId.includes(',')">{{loop.userId.slice(0, loop.userId.length)}}</p>
                <p v-else>{{loop.userId.slice(0, loop.userId.indexOf(','))}}</p>
              </div>
              <div class="col text-right">
                <span
                  class="rec"
                  v-if="loop.userId.split(',').length > 1"
                  v-on:click="ToggleOpen(loop.id)"
                >+{{loop.userId.split(',').length - 1}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h6 v-bind:style="{fontSize: 'large'}">{{loop.title}}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "Hennges",
  data() {
    return {
      count: 0,
      date: new Date(),
      newDate: "",
      selectDate1: "",
      selectDate2: "",
      isactive: false,
      isToggle: false,
      ToggleData: [],
      calender: false,
      selectedId: null,
      newdates: [],
      newTime: [],
      arrs: [],
      arr: [
        {
          id: 1,
          email: "aaa@example.com",
          userId: "zzz@example.com",
          title: "[ HR-888 ] Notice of official announcement ",
          date: "2019-12-31"
        },
        {
          id: 2,
          email: "bbb@example.com",
          userId: "yyy@example.com,ffff@example.com,kkkk@example.com",
          title: "[web:333] Web Contact",
          date: "2019-12-01",
          completed: true
        },
        {
          id: 3,
          email: "ccc@example.com",
          userId:
            "diwakarjoshi991@gmail.com,iiii@example.com,lllll@example.com,qqqq@example.com",
          title: "[No Info] A VAMOS Brand",
          date: "2020-02-02",
          completed: false
        },
        {
          id: 4,
          email: "ddd@example.com",
          userId:
            "mmm@example.com,aaa@example.com,aaa@example.com,aaa@example.com,aaa@example.com",
          title:
            "[HR-887(Revised: Office Expansion Project Team)] Notice of off",
          date: "2019-12-03",
          completed: false
        },
        {
          id: 5,
          email: "eee@example.com",
          userId:
            "nnn@example.com,aaa@example.com,aaa@example.com,aaa@example.com",
          title: "Workplace Summary for sample, Inc.: Jun 2 - Jun 9 ",
          date: "2019-12-04",
          completed: true
        },
        {
          id: 6,
          email: "fff@example.com",
          userId: "ooo@example.com",
          title: "[info:888] ABC EQUIPMENT COMPANY",
          date: "2020-04-05",
          completed: true
        },
        {
          id: 7,
          email: "ggg@example.com",
          userId:
            "qqq@example.com,aaa@example.com,aaa@example.com",
          title: "Re: [Github] Brush-up on loading animation ",
          date: "2020-06-15",
          completed: false
        },
        {
          id: 8,
          email: "hhh@example.com",
          userId:
            "rrr@example.com,aaa@example.com,aaa@example.com,aaa@example.com,aaa@example.com",
          title: "[dev] Postfix 3.1.12 / 3.2.9 / 3.3.4 / 3.4.5 ",
          date: "12:34:17",
          completed: true
        },
        {
          id: 9,
          email: "iii@example.com",
          userId: "sssss@example.com,aaa@example.com",
          title: "[info:888] ABC EQUIPMENT COMPANY",
          date: "2020-07-30",
          completed: false
        },
        {
          id: 10,
          email: "vvv@example.com",
          userId: "xxx@example.com",
          title: "Happy New Year! Greetings for the New Year. ",
          date: "2020-05-20",
          completed: false
        }
      ]
    };
  },
  beforeMount() {
    this.newDate = new Date(
      this.date.getTime() - this.date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 10);
  },
  mounted() {
    this.arrs = [...this.arr];
    if (!this.isactive) {
      return this.sortByDate();
    }
  },
  methods: {
    ToggleOpen: function(id) {
      this.selectedId = id;
      this.isToggle = !this.isToggle;
    },
    getDate: function() {
    console.log(this.date);
    this.selectDate1 = this.date[0].toISOString().slice(0, 10);
    this.selectDate2 = this.date[1].toISOString().slice(0, 10);
    console.log(this.selectDate1, this.selectDate2);
  },
    searchDataByDate: function() {
      this.arr = this.arrs.filter(item => {
        return item.date >= this.selectDate1 && item.date <= this.selectDate2;
      });
      this.selectDate1 = "";
      this.selectDate2 = "d2";
    },

    Reset: function(){
      this.arr = [...this.arrs];
      this.sortByDate();
            this.selectDate2 = "";
    },

    sortByDate: function() {
      
      this.isactive = !this.isactive;

      this.arr.forEach(v => {
        this.isDate =
          new Date(v.date) !== "Invalid Date" && !isNaN(new Date(v.date));
        if (this.isDate) {
          this.newdates.push(v);
          this.newdates.sort((a, b) => {
            if (this.isactive) {
              return new Date(b.date.localeCompare(a.date));
            } else {
              return new Date(a.date.localeCompare(b.date));
            }
          });
        } else {
          this.newTime.push(v);
          this.newTime.sort((a, b) => {
            if (this.isactive) {
              return new Date(b.date.localeCompare(a.date));
            } else {
              return new Date(a.date.localeCompare(b.date));
            }
          });
        }
      });
      if (this.isactive) {
        this.arr = [...this.newTime, ...this.newdates];
        this.newdates = [];
        this.newTime = [];
      } else {
        this.arr = [...this.newdates, ...this.newTime];
        this.newdates = [];
        this.newTime = [];
      }
    }
  }
};
</script>

<style>

.v2-date-wrap.v2-date-range-wrap {
  height: auto;
  margin-left: -12px;
  font-size: 15px;
    border-color: #ced4da;
        border-left-color: white;

}
.v2-date-wrap.v2-date-range-wrap:hover {
 
border-color: #ced4da;
border-left-color: white;
}
svg.v2-date-icon {
  display:none;
}
svg.v2-date-clear {
  display:none;
}
span.v2-picker-trigger.empty-text{
  font-size: 15px;
}
.results{
  color: #666669;
}
.logo {
  margin-top: 12rem;
}
.hr {
  margin-top: 0rem;
}

.hr2 {
  border: 0;
  margin-top: 0rem;
  clear: both;
  display: block;
  width: 100%;
  background-color: #ccd1d1;
  height: 1px;
}
.hr3 {
  border: 0;
  margin-top: 0rem;
  clear: both;
  display: block;
  width: 100%;
  background-color: #ccd1d1;
  height: 1px;
}

img.arrow {
  transform: rotate(180deg);
}
.rec {
  /* width: 20px;
  height: 20px; */
  background: rgb(112, 112, 112);
  border-radius: 4px;
  padding: 3px;
  font-size: 12px;
  cursor: pointer;
  margin: 0px 3px;
  color: #fff;
  font-weight: bold;
  border: 2px solid rgb(102, 102, 102);
}
.pointer {
  pointer-events: none;
}
.plusData {
  display: inline-block;
  height: auto;
  width: auto;
  position: absolute;
  background: darkgrey;
  border-radius: 5px;
  padding: 0.8rem;
  color: white;
  overflow: auto;
  margin: -14px 5px;
}

/* -sm screen styles */
.small-screen {
  text-align: start;
  font-weight: bold;
  background: #f5f5f5;
  padding-bottom: 10px;
}
.small-screen > span {
  margin-left: 13px;
  margin-right: 0px;
}

 .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
  color: blue;
  cursor: pointer;
}
@media (min-width: 360px) and (max-width: 640px) {
  .v2-picker-range-panel.v2-picker-range__right-panel {
    display: none;
}
.v2-picker-panel-wrap.v2-picker-range-panel-wrap {
    left: 50px;
}
}


@media (min-width: 411px) and (max-width: 546px) {
  .date1 {
    margin: auto;
  }
  .date2 {
    margin: auto;
  }
  .v2-picker-range-panel.v2-picker-range__right-panel {
    display: none;
}
.v2-picker-panel-wrap.v2-picker-range-panel-wrap {
    left: 50px;
}

}

@media (min-width: 978px) {
  .date1 {
    margin: inherit;
    margin-right: -10px;
  }
  .date2 {
    margin: inherit;
  }
  /* .v2-picker-panel-wrap.v2-picker-range-panel-wrap {
    left: 20px;
} */
  thead,
  tbody,
  td {
    text-align: start;
  }
}
</style>