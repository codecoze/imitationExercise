export default (data = [])=>{
    return {
        title: {
            text: "电影当日综合票房占比",
            subtext: "数据来自猫眼电影（非实时）",
            textStyle: {
                fontSize: 24,
                color: "hsl(0deg, 100%, 100%)",
            },
            subtextStyle: {
                fontSize: 14,
                color: "hsl(0deg, 20%, 75%)",
            },
        },
        tooltip: {
            trigger: "item",
            padding: [14, 24],
            borderWidth: 0,
            extraCssText: "box-shadow: 0 0 24px hsl(0, 100%, 50%, 0.2);",
            textStyle: {
                fontWeight: "bold",
                color: "hsl(0deg, 0%, 40%)",
            },
        },
        color: [
            "hsl(0deg, 100%, 70%)",
            "hsl(0deg, 90%, 60%)",
            "hsl(0deg, 80%, 50%)",
            "hsl(0deg, 70%, 45%)",
            "hsl(0deg, 60%, 40%)",
            "hsl(0deg, 50%, 35%)",
            "hsl(0deg, 40%, 30%)",
        ],
        series: [
            {
                type: "pie",
                radius: ["50%", "70%"],  //内外半径
                startAngle: 160,
                top: 60,
                label: {  //环形图文本说明
                    show: true,
                    position: "outer",
                    alignTo: "labelLine",
                    edgeDistance: "3%",
                    distanceToLabelLine: 20,
                    color: "hsl(0deg, 100%, 98%)",
                    fontSize: 14,
                    fontWeight: "bold",
                    formatter: "{b} {d|{d}%}",  // {b}、{d} 是占位符，分别表示数据名，也就是电影名，和百分比。 {d}% 前边的 d | 相当于是 css 中的 class，可以在 rich 中引用
                    rich: {  //通过引用 d 来设置百分比的样式，给文字添加背景、圆角和间距，这样文字就会显示为 tag 样式，然后设置字体颜色和加粗。
                        d: {
                            backgroundColor: "hsl(0deg, 100%, 70%)",
                            borderRadius: 4,
                            padding: [4, 8],
                            color: "white",
                            fontWeight: "bold",
                        },
                    },
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 18,
                        fontWeight: "bold",
                    },
                },
                labelLine: {  //labelLine 用于设置指示线的样式。
                    length: 30,
                    length2: "20%",
                    smooth: true,
                    lineStyle: {
                        type: "dashed",
                    },
                },
                data: data,
            },
        ],
        backgroundColor: "transparent",
    }
}