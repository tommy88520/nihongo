export interface Word {
  id: string
  cat: string
  kana: string
  kanji: string | null
  zh: string
}

// JLPT N5 常用單字（id 固定，SRS 進度依 id 存）
export const words: Word[] = [
  {
    "id": "w001",
    "cat": "招呼",
    "kana": "おはよう",
    "kanji": null,
    "zh": "早安"
  },
  {
    "id": "w002",
    "cat": "招呼",
    "kana": "こんにちは",
    "kanji": null,
    "zh": "你好"
  },
  {
    "id": "w003",
    "cat": "招呼",
    "kana": "こんばんは",
    "kanji": null,
    "zh": "晚安（晚上好）"
  },
  {
    "id": "w004",
    "cat": "招呼",
    "kana": "ありがとう",
    "kanji": null,
    "zh": "謝謝"
  },
  {
    "id": "w005",
    "cat": "招呼",
    "kana": "すみません",
    "kanji": null,
    "zh": "不好意思；對不起"
  },
  {
    "id": "w006",
    "cat": "招呼",
    "kana": "さようなら",
    "kanji": null,
    "zh": "再見"
  },
  {
    "id": "w007",
    "cat": "招呼",
    "kana": "おやすみなさい",
    "kanji": null,
    "zh": "晚安（睡前）"
  },
  {
    "id": "w008",
    "cat": "招呼",
    "kana": "いただきます",
    "kanji": null,
    "zh": "開動了"
  },
  {
    "id": "w009",
    "cat": "招呼",
    "kana": "ごちそうさま",
    "kanji": null,
    "zh": "謝謝招待（吃飽了）"
  },
  {
    "id": "w010",
    "cat": "招呼",
    "kana": "はじめまして",
    "kanji": null,
    "zh": "初次見面"
  },
  {
    "id": "w011",
    "cat": "人物",
    "kana": "わたし",
    "kanji": "私",
    "zh": "我"
  },
  {
    "id": "w012",
    "cat": "人物",
    "kana": "あなた",
    "kanji": null,
    "zh": "你"
  },
  {
    "id": "w013",
    "cat": "人物",
    "kana": "ひと",
    "kanji": "人",
    "zh": "人"
  },
  {
    "id": "w014",
    "cat": "人物",
    "kana": "ともだち",
    "kanji": "友達",
    "zh": "朋友"
  },
  {
    "id": "w015",
    "cat": "人物",
    "kana": "せんせい",
    "kanji": "先生",
    "zh": "老師"
  },
  {
    "id": "w016",
    "cat": "人物",
    "kana": "がくせい",
    "kanji": "学生",
    "zh": "學生"
  },
  {
    "id": "w017",
    "cat": "人物",
    "kana": "かぞく",
    "kanji": "家族",
    "zh": "家人"
  },
  {
    "id": "w018",
    "cat": "人物",
    "kana": "ちち",
    "kanji": "父",
    "zh": "（我的）父親"
  },
  {
    "id": "w019",
    "cat": "人物",
    "kana": "はは",
    "kanji": "母",
    "zh": "（我的）母親"
  },
  {
    "id": "w020",
    "cat": "人物",
    "kana": "こども",
    "kanji": "子供",
    "zh": "小孩"
  },
  {
    "id": "w021",
    "cat": "人物",
    "kana": "おとこ",
    "kanji": "男",
    "zh": "男人"
  },
  {
    "id": "w022",
    "cat": "人物",
    "kana": "おんな",
    "kanji": "女",
    "zh": "女人"
  },
  {
    "id": "w023",
    "cat": "數字",
    "kana": "いち",
    "kanji": "一",
    "zh": "一"
  },
  {
    "id": "w024",
    "cat": "數字",
    "kana": "に",
    "kanji": "二",
    "zh": "二"
  },
  {
    "id": "w025",
    "cat": "數字",
    "kana": "さん",
    "kanji": "三",
    "zh": "三"
  },
  {
    "id": "w026",
    "cat": "數字",
    "kana": "よん",
    "kanji": "四",
    "zh": "四"
  },
  {
    "id": "w027",
    "cat": "數字",
    "kana": "ご",
    "kanji": "五",
    "zh": "五"
  },
  {
    "id": "w028",
    "cat": "數字",
    "kana": "ろく",
    "kanji": "六",
    "zh": "六"
  },
  {
    "id": "w029",
    "cat": "數字",
    "kana": "なな",
    "kanji": "七",
    "zh": "七"
  },
  {
    "id": "w030",
    "cat": "數字",
    "kana": "はち",
    "kanji": "八",
    "zh": "八"
  },
  {
    "id": "w031",
    "cat": "數字",
    "kana": "きゅう",
    "kanji": "九",
    "zh": "九"
  },
  {
    "id": "w032",
    "cat": "數字",
    "kana": "じゅう",
    "kanji": "十",
    "zh": "十"
  },
  {
    "id": "w033",
    "cat": "數字",
    "kana": "ひゃく",
    "kanji": "百",
    "zh": "百"
  },
  {
    "id": "w034",
    "cat": "數字",
    "kana": "せん",
    "kanji": "千",
    "zh": "千"
  },
  {
    "id": "w035",
    "cat": "數字",
    "kana": "まん",
    "kanji": "万",
    "zh": "萬"
  },
  {
    "id": "w036",
    "cat": "時間",
    "kana": "いま",
    "kanji": "今",
    "zh": "現在"
  },
  {
    "id": "w037",
    "cat": "時間",
    "kana": "きょう",
    "kanji": "今日",
    "zh": "今天"
  },
  {
    "id": "w038",
    "cat": "時間",
    "kana": "あした",
    "kanji": "明日",
    "zh": "明天"
  },
  {
    "id": "w039",
    "cat": "時間",
    "kana": "きのう",
    "kanji": "昨日",
    "zh": "昨天"
  },
  {
    "id": "w040",
    "cat": "時間",
    "kana": "あさ",
    "kanji": "朝",
    "zh": "早上"
  },
  {
    "id": "w041",
    "cat": "時間",
    "kana": "ひる",
    "kanji": "昼",
    "zh": "中午"
  },
  {
    "id": "w042",
    "cat": "時間",
    "kana": "よる",
    "kanji": "夜",
    "zh": "晚上"
  },
  {
    "id": "w043",
    "cat": "時間",
    "kana": "しゅうまつ",
    "kanji": "週末",
    "zh": "週末"
  },
  {
    "id": "w044",
    "cat": "時間",
    "kana": "まいにち",
    "kanji": "毎日",
    "zh": "每天"
  },
  {
    "id": "w045",
    "cat": "時間",
    "kana": "じかん",
    "kanji": "時間",
    "zh": "時間"
  },
  {
    "id": "w046",
    "cat": "時間",
    "kana": "ねん",
    "kanji": "年",
    "zh": "年"
  },
  {
    "id": "w047",
    "cat": "時間",
    "kana": "つき",
    "kanji": "月",
    "zh": "月；月亮"
  },
  {
    "id": "w048",
    "cat": "食物",
    "kana": "ごはん",
    "kanji": "ご飯",
    "zh": "飯；餐"
  },
  {
    "id": "w049",
    "cat": "食物",
    "kana": "みず",
    "kanji": "水",
    "zh": "水"
  },
  {
    "id": "w050",
    "cat": "食物",
    "kana": "おちゃ",
    "kanji": "お茶",
    "zh": "茶"
  },
  {
    "id": "w051",
    "cat": "食物",
    "kana": "コーヒー",
    "kanji": null,
    "zh": "咖啡"
  },
  {
    "id": "w052",
    "cat": "食物",
    "kana": "パン",
    "kanji": null,
    "zh": "麵包"
  },
  {
    "id": "w053",
    "cat": "食物",
    "kana": "にく",
    "kanji": "肉",
    "zh": "肉"
  },
  {
    "id": "w054",
    "cat": "食物",
    "kana": "さかな",
    "kanji": "魚",
    "zh": "魚"
  },
  {
    "id": "w055",
    "cat": "食物",
    "kana": "やさい",
    "kanji": "野菜",
    "zh": "蔬菜"
  },
  {
    "id": "w056",
    "cat": "食物",
    "kana": "くだもの",
    "kanji": "果物",
    "zh": "水果"
  },
  {
    "id": "w057",
    "cat": "食物",
    "kana": "たまご",
    "kanji": "卵",
    "zh": "蛋"
  },
  {
    "id": "w058",
    "cat": "食物",
    "kana": "すし",
    "kanji": "寿司",
    "zh": "壽司"
  },
  {
    "id": "w059",
    "cat": "食物",
    "kana": "ラーメン",
    "kanji": null,
    "zh": "拉麵"
  },
  {
    "id": "w060",
    "cat": "地點",
    "kana": "いえ",
    "kanji": "家",
    "zh": "家"
  },
  {
    "id": "w061",
    "cat": "地點",
    "kana": "がっこう",
    "kanji": "学校",
    "zh": "學校"
  },
  {
    "id": "w062",
    "cat": "地點",
    "kana": "えき",
    "kanji": "駅",
    "zh": "車站"
  },
  {
    "id": "w063",
    "cat": "地點",
    "kana": "みせ",
    "kanji": "店",
    "zh": "店"
  },
  {
    "id": "w064",
    "cat": "地點",
    "kana": "かいしゃ",
    "kanji": "会社",
    "zh": "公司"
  },
  {
    "id": "w065",
    "cat": "地點",
    "kana": "びょういん",
    "kanji": "病院",
    "zh": "醫院"
  },
  {
    "id": "w066",
    "cat": "地點",
    "kana": "トイレ",
    "kanji": null,
    "zh": "廁所"
  },
  {
    "id": "w067",
    "cat": "地點",
    "kana": "へや",
    "kanji": "部屋",
    "zh": "房間"
  },
  {
    "id": "w068",
    "cat": "地點",
    "kana": "まち",
    "kanji": "町",
    "zh": "城鎮；街區"
  },
  {
    "id": "w069",
    "cat": "地點",
    "kana": "くに",
    "kanji": "国",
    "zh": "國家"
  },
  {
    "id": "w070",
    "cat": "地點",
    "kana": "にほん",
    "kanji": "日本",
    "zh": "日本"
  },
  {
    "id": "w071",
    "cat": "地點",
    "kana": "たいわん",
    "kanji": "台湾",
    "zh": "台灣"
  },
  {
    "id": "w072",
    "cat": "物品",
    "kana": "ほん",
    "kanji": "本",
    "zh": "書"
  },
  {
    "id": "w073",
    "cat": "物品",
    "kana": "かばん",
    "kanji": "鞄",
    "zh": "包包"
  },
  {
    "id": "w074",
    "cat": "物品",
    "kana": "でんわ",
    "kanji": "電話",
    "zh": "電話"
  },
  {
    "id": "w075",
    "cat": "物品",
    "kana": "くるま",
    "kanji": "車",
    "zh": "車"
  },
  {
    "id": "w076",
    "cat": "物品",
    "kana": "でんしゃ",
    "kanji": "電車",
    "zh": "電車"
  },
  {
    "id": "w077",
    "cat": "物品",
    "kana": "かさ",
    "kanji": "傘",
    "zh": "傘"
  },
  {
    "id": "w078",
    "cat": "物品",
    "kana": "とけい",
    "kanji": "時計",
    "zh": "時鐘；手錶"
  },
  {
    "id": "w079",
    "cat": "物品",
    "kana": "つくえ",
    "kanji": "机",
    "zh": "桌子"
  },
  {
    "id": "w080",
    "cat": "物品",
    "kana": "いす",
    "kanji": "椅子",
    "zh": "椅子"
  },
  {
    "id": "w081",
    "cat": "物品",
    "kana": "おかね",
    "kanji": "お金",
    "zh": "錢"
  },
  {
    "id": "w082",
    "cat": "物品",
    "kana": "しんぶん",
    "kanji": "新聞",
    "zh": "報紙"
  },
  {
    "id": "w083",
    "cat": "物品",
    "kana": "テレビ",
    "kanji": null,
    "zh": "電視"
  },
  {
    "id": "w084",
    "cat": "動詞",
    "kana": "たべる",
    "kanji": "食べる",
    "zh": "吃"
  },
  {
    "id": "w085",
    "cat": "動詞",
    "kana": "のむ",
    "kanji": "飲む",
    "zh": "喝"
  },
  {
    "id": "w086",
    "cat": "動詞",
    "kana": "いく",
    "kanji": "行く",
    "zh": "去"
  },
  {
    "id": "w087",
    "cat": "動詞",
    "kana": "くる",
    "kanji": "来る",
    "zh": "來"
  },
  {
    "id": "w088",
    "cat": "動詞",
    "kana": "かえる",
    "kanji": "帰る",
    "zh": "回去"
  },
  {
    "id": "w089",
    "cat": "動詞",
    "kana": "みる",
    "kanji": "見る",
    "zh": "看"
  },
  {
    "id": "w090",
    "cat": "動詞",
    "kana": "きく",
    "kanji": "聞く",
    "zh": "聽；問"
  },
  {
    "id": "w091",
    "cat": "動詞",
    "kana": "はなす",
    "kanji": "話す",
    "zh": "說"
  },
  {
    "id": "w092",
    "cat": "動詞",
    "kana": "よむ",
    "kanji": "読む",
    "zh": "讀"
  },
  {
    "id": "w093",
    "cat": "動詞",
    "kana": "かく",
    "kanji": "書く",
    "zh": "寫"
  },
  {
    "id": "w094",
    "cat": "動詞",
    "kana": "かう",
    "kanji": "買う",
    "zh": "買"
  },
  {
    "id": "w095",
    "cat": "動詞",
    "kana": "する",
    "kanji": null,
    "zh": "做"
  },
  {
    "id": "w096",
    "cat": "動詞",
    "kana": "ねる",
    "kanji": "寝る",
    "zh": "睡覺"
  },
  {
    "id": "w097",
    "cat": "動詞",
    "kana": "おきる",
    "kanji": "起きる",
    "zh": "起床"
  },
  {
    "id": "w098",
    "cat": "動詞",
    "kana": "あう",
    "kanji": "会う",
    "zh": "見面"
  },
  {
    "id": "w099",
    "cat": "動詞",
    "kana": "まつ",
    "kanji": "待つ",
    "zh": "等"
  },
  {
    "id": "w100",
    "cat": "動詞",
    "kana": "わかる",
    "kanji": "分かる",
    "zh": "懂；明白"
  },
  {
    "id": "w101",
    "cat": "動詞",
    "kana": "ある",
    "kanji": null,
    "zh": "有（物品）"
  },
  {
    "id": "w102",
    "cat": "動詞",
    "kana": "いる",
    "kanji": null,
    "zh": "有；在（人、動物）"
  },
  {
    "id": "w103",
    "cat": "動詞",
    "kana": "べんきょうする",
    "kanji": "勉強する",
    "zh": "讀書；學習"
  },
  {
    "id": "w104",
    "cat": "形容詞",
    "kana": "おおきい",
    "kanji": "大きい",
    "zh": "大的"
  },
  {
    "id": "w105",
    "cat": "形容詞",
    "kana": "ちいさい",
    "kanji": "小さい",
    "zh": "小的"
  },
  {
    "id": "w106",
    "cat": "形容詞",
    "kana": "たかい",
    "kanji": "高い",
    "zh": "高的；貴的"
  },
  {
    "id": "w107",
    "cat": "形容詞",
    "kana": "やすい",
    "kanji": "安い",
    "zh": "便宜的"
  },
  {
    "id": "w108",
    "cat": "形容詞",
    "kana": "あたらしい",
    "kanji": "新しい",
    "zh": "新的"
  },
  {
    "id": "w109",
    "cat": "形容詞",
    "kana": "ふるい",
    "kanji": "古い",
    "zh": "舊的"
  },
  {
    "id": "w110",
    "cat": "形容詞",
    "kana": "おいしい",
    "kanji": "美味しい",
    "zh": "好吃的"
  },
  {
    "id": "w111",
    "cat": "形容詞",
    "kana": "たのしい",
    "kanji": "楽しい",
    "zh": "快樂的；有趣的"
  },
  {
    "id": "w112",
    "cat": "形容詞",
    "kana": "むずかしい",
    "kanji": "難しい",
    "zh": "困難的"
  },
  {
    "id": "w113",
    "cat": "形容詞",
    "kana": "やさしい",
    "kanji": "優しい",
    "zh": "溫柔的"
  },
  {
    "id": "w114",
    "cat": "形容詞",
    "kana": "あつい",
    "kanji": "暑い",
    "zh": "熱的（天氣）"
  },
  {
    "id": "w115",
    "cat": "形容詞",
    "kana": "さむい",
    "kanji": "寒い",
    "zh": "冷的（天氣）"
  },
  {
    "id": "w116",
    "cat": "形容詞",
    "kana": "いそがしい",
    "kanji": "忙しい",
    "zh": "忙碌的"
  },
  {
    "id": "w117",
    "cat": "形容詞",
    "kana": "すき",
    "kanji": "好き",
    "zh": "喜歡"
  },
  {
    "id": "w118",
    "cat": "形容詞",
    "kana": "きれい",
    "kanji": null,
    "zh": "漂亮；乾淨"
  },
  {
    "id": "w119",
    "cat": "形容詞",
    "kana": "げんき",
    "kanji": "元気",
    "zh": "有精神；健康"
  },
  {
    "id": "w120",
    "cat": "形容詞",
    "kana": "しずか",
    "kanji": "静か",
    "zh": "安靜"
  },
  {
    "id": "w121",
    "cat": "疑問",
    "kana": "なに",
    "kanji": "何",
    "zh": "什麼"
  },
  {
    "id": "w122",
    "cat": "疑問",
    "kana": "だれ",
    "kanji": "誰",
    "zh": "誰"
  },
  {
    "id": "w123",
    "cat": "疑問",
    "kana": "どこ",
    "kanji": null,
    "zh": "哪裡"
  },
  {
    "id": "w124",
    "cat": "疑問",
    "kana": "いつ",
    "kanji": null,
    "zh": "什麼時候"
  },
  {
    "id": "w125",
    "cat": "疑問",
    "kana": "いくら",
    "kanji": null,
    "zh": "多少錢"
  },
  {
    "id": "w126",
    "cat": "疑問",
    "kana": "どうして",
    "kanji": null,
    "zh": "為什麼"
  },
  {
    "id": "w127",
    "cat": "疑問",
    "kana": "どれ",
    "kanji": null,
    "zh": "哪一個"
  }
]

export const categories = [...new Set(words.map((w) => w.cat))]
