<template>
    <div class="analysis">
        <div class="num">
            <el-card class="member">
                <div class="title">客房数量</div>
                <div class="data">{{ guestNum }}</div>
            </el-card>
            <el-card class="guest">
                <div class="title">用户数量</div>
                <div class="data">{{ memberNum }}</div>
            </el-card>
            <el-card class="order">
                <div class="title">订单数量</div>
                <div class="data">{{ orderNum }}</div>
            </el-card>
            <el-card class="order">
                <div class="title">营业额</div>
                <div class="data">{{ turnNum }}</div>
            </el-card>
        </div>
    </div>
    <div id="member"></div>
    <div id="guest"></div>
    <div id="order"></div>
    <div id="turn"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { getMemberData, getMemberSevenData } from '@/service/main/index';
import { getOrderData, getOrderSevenData, getTurnData, getTurnSevenData } from '@/service/main/order/index';
import { getGuestData, getGuestSevenData } from '@/service/main/guest/index';


const memberNum = ref(0);
const memberSeven = ref([]);
const guestNum = ref(0);
const guestSeven = ref([]);
const orderNum = ref(0);
const orderSeven = ref([]);
const turnNum = ref(0);
const turnSeven = ref([]);

var dateArr = [];//用来存放最近七天的时间

function getBeforeDate(n) {
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    if (day <= n) {
        if (mon > 1) {
            mon = mon - 1;
        } else {
            year = year - 1;
            mon = 12;
        }
    }
    d.setDate(d.getDate() + n); //很重要，+n取得是前一天的时间
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    var s = (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    return s;
}
for (var i = 0; i > -7; i--) {
    dateArr.unshift(getBeforeDate(i));
}
console.log(dateArr);
getMemberData().then(res => {
    memberNum.value = res.data[0].count;
})

getOrderData().then(res => {
    orderNum.value = res.data[0].count;
})
getGuestData().then(res => {
    guestNum.value = res.data[0].count;
})
getTurnData().then(res => {
    turnNum.value = res.data[0].count;
})
onMounted(() => {
    var myChartMember = echarts.init(document.getElementById('member'));
    var myChartGuest = echarts.init(document.getElementById('guest'));
    var myChartOrder = echarts.init(document.getElementById('order'));
    var myChartTurn = echarts.init(document.getElementById('turn'))
    getMemberSevenData().then(res => {
        memberSeven.value = res.data
        const optionMember = {
            title: {
                text: "近七天用户数量统计"
            },
            xAxis: {
                name: '日期',
                type: 'category',
                data: dateArr
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false//是否显示分隔线。默认数值轴显示，类目轴不显示。
                },
                nameGap: 15,
                axisTick: {
                    inside: true
                }

            },
            series: [
                {
                    data: [memberSeven.value[6].record_count, memberSeven.value[5].record_count, memberSeven.value[4].record_count, memberSeven.value[3].record_count, memberSeven.value[2].record_count, memberSeven.value[1].record_count, memberSeven.value[0].record_count],
                    type: 'line',
                    symbol: 'circle',//标记的类型：圆圈
                    itemStyle: {
                        normal: {
                            shadowBlur: 50,
                            shadowColor: 'red',
                            color: 'red',//图形的颜色 
                            lineStyle: {
                                color: '#4d6dfd',//线的颜色 
                                width: 1//线的宽度 
                            }
                        }
                    }
                }
            ]
        };
        myChartMember.setOption(optionMember);
    })
    getGuestSevenData().then(res => {
        console.log(res);
        guestSeven.value = res.data
        const optionGuest = {
            title: {
                text: "近七天客房数量统计"
            },
            xAxis: {
                name: '日期',
                type: 'category',
                data: dateArr
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false//是否显示分隔线。默认数值轴显示，类目轴不显示。
                },
                nameGap: 15,
                axisTick: {
                    inside: true
                }

            },
            series: [
                {
                    data: [guestSeven.value[6].record_count, guestSeven.value[5].record_count, guestSeven.value[4].record_count, guestSeven.value[3].record_count, guestSeven.value[2].record_count, guestSeven.value[1].record_count, guestSeven.value[0].record_count],
                    type: 'line',
                    symbol: 'circle',//标记的类型：圆圈
                    itemStyle: {
                        normal: {
                            shadowBlur: 50,
                            shadowColor: 'red',
                            color: 'red',//图形的颜色 
                            lineStyle: {
                                color: '#4d6dfd',//线的颜色 
                                width: 1//线的宽度 
                            }
                        }
                    }
                }
            ]
        };
        myChartGuest.setOption(optionGuest);
    })
    getOrderSevenData().then(res => {
        orderSeven.value = res.data
        console.log(res);
        const optionOrder = {
            title: {
                text: "近七天订单数量统计"
            },
            xAxis: {
                name: '日期',
                type: 'category',
                data: dateArr
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false//是否显示分隔线。默认数值轴显示，类目轴不显示。
                },
                nameGap: 15,
                axisTick: {
                    inside: true
                }

            },
            series: [
                {
                    data: [orderSeven.value[6].record_count, orderSeven.value[5].record_count, orderSeven.value[4].record_count, orderSeven.value[3].record_count, orderSeven.value[2].record_count, orderSeven.value[1].record_count, orderSeven.value[0].record_count],
                    type: 'line',
                    symbol: 'circle',//标记的类型：圆圈
                    itemStyle: {
                        normal: {
                            shadowBlur: 50,
                            shadowColor: 'red',
                            color: 'red',//图形的颜色 
                            lineStyle: {
                                color: '#4d6dfd',//线的颜色 
                                width: 1//线的宽度 
                            }
                        }
                    }
                }
            ]
        };
        myChartOrder.setOption(optionOrder);
    })
    getTurnSevenData().then(res => {
        turnSeven.value = res.data
        console.log(res);
        const optionTurn = {
            title: {
                text: "近七天营业额统计"
            },
            xAxis: {
                name: '日期',
                type: 'category',
                data: dateArr
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false//是否显示分隔线。默认数值轴显示，类目轴不显示。
                },
                nameGap: 15,
                axisTick: {
                    inside: true
                }

            },
            series: [
                {
                    data: [turnSeven.value[6].record_count, turnSeven.value[5].record_count, turnSeven.value[4].record_count, turnSeven.value[3].record_count, turnSeven.value[2].record_count, turnSeven.value[1].record_count, turnSeven.value[0].record_count],
                    type: 'line',
                    symbol: 'circle',//标记的类型：圆圈
                    itemStyle: {
                        normal: {
                            shadowBlur: 50,
                            shadowColor: 'red',
                            color: 'red',//图形的颜色 
                            lineStyle: {
                                color: '#4d6dfd',//线的颜色 
                                width: 1//线的宽度 
                            }
                        }
                    }
                }
            ]
        };
        myChartTurn.setOption(optionTurn);
    })
})


</script>

<style lang="less" scoped>
.num {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 40px;
}

.title {
    font-size: 20px;
    font-weight: 800;
}

.data {
    font-size: 20px;
}

.num .el-card {
    width: 400px;
}

#member {
    width: 100%;
    height: 400px;
}

#order {
    width: 100%;
    height: 400px;
}

#guest {
    width: 100%;
    height: 400px;
}

#turn {
    width: 100%;
    height: 400px;
}
</style>
