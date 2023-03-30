// ---------------------------- 공항 목록 ---------------------------------//
const CAI = {
  city: "카이로",
  country: "이집트",
  code: "CAI",
  name: "카이로국제공항",
  lat: 30.1111,
  lng: 31.4139,
};
const JNB = {
  city: "요하네스버그",
  country: "남아프리카공화국",
  code: "JNB",
  name: "오알탐보국제두방공항",
  lat: -26.1338,
  lng: 28.242,
};
const CPT = {
  city: "케이프타운",
  country: "남아프리카공화국",
  code: "CPT",
  name: "케이프타운국제공항",
  lat: -33.9715,
  lng: 18.6021,
};
const NBO = {
  city: "나이로비",
  country: "케냐",
  code: "NBO",
  name: "조모케냐타국제공항",
  lat: -1.3192,
  lng: 36.9259,
};
const ALG = {
  city: "알제",
  country: "알제리",
  code: "ALG",
  name: "우아리부메디엔공항",
  lat: 36.6944,
  lng: 3.2158,
};
const CMN = {
  city: "카사블랑카",
  country: "모로코",
  code: "CMN",
  name: "모하메드V국제공항",
  lat: 33.3668,
  lng: -7.5825,
};
const LOS = {
  city: "라고스",
  country: "나이지리아",
  code: "LOS",
  name: "무르탈라무하마드공항",
  lat: 6.5774,
  lng: 3.3215,
};
const ACC = {
  city: "아크라",
  country: "가나",
  code: "ACC",
  name: "코토카국제공항",
  lat: 5.6052,
  lng: -0.1673,
};
const DAR = {
  city: "다르에스살람",
  country: "탄자니아",
  code: "DAR",
  name: "줄리어스니에레레국제공항",
  lat: -6.8733,
  lng: 39.2026,
};
const TUN = {
  city: "튀니즈",
  country: "튜니지아",
  code: "TUN",
  name: "튀니즈카르타고공항",
  lat: 36.8479,
  lng: 10.2256,
};

const DXB = {
  city: "두바이",
  country: "아랍에미리트",
  code: "DXB",
  name: "두바이국제공항",
  lat: 25.2528,
  lng: 55.3644,
};
const AUH = {
  city: "아부 다비",
  country: "아랍에미리트",
  code: "AUH",
  name: "아부다비국제공항",
  lat: 24.4338,
  lng: 54.6458,
};
const TLV = {
  city: "텔아비브",
  country: "이스라엘",
  code: "TLV",
  name: "벤구리온국제공항",
  lat: 32.0114,
  lng: 34.885,
};
const IKA = {
  city: "테헤란",
  country: "이란",
  code: "IKA",
  name: "이맘호메이니공항",
  lat: 35.4161,
  lng: 51.1522,
};
const DOH = {
  city: "도하",
  country: "카타르",
  code: "DOH",
  name: "하마드국제공항",
  lat: 25.2736,
  lng: 51.6089,
};
const AMM = {
  city: "암만",
  country: "요르단",
  code: "AMM",
  name: "퀸알리아국제공항",
  lat: 31.7226,
  lng: 35.9932,
};
const KWI = {
  city: "쿠웨이트",
  country: "쿠웨이트",
  code: "KWI",
  name: "쿠웨이트국제공항",
  lat: 29.2266,
  lng: 47.9689,
};
const DMM = {
  city: "담맘",
  country: "사우디아라비아",
  code: "DMM",
  name: "킹파드공항",
  lat: 26.4712,
  lng: 49.7979,
};
const JED = {
  city: "젯다",
  country: "사우디아라비아",
  code: "JED",
  name: "젯다공항",
  lat: 21.6706,
  lng: 39.1564,
};
const RUH = {
  city: "리야드",
  country: "사우디아라비아",
  code: "RUH",
  name: "킹할리드국제공항",
  lat: 24.9576,
  lng: 46.6988,
};
const KTM = {
  city: "카트만두",
  country: "네팔",
  code: "KTM",
  name: "카트만두공항",
  lat: 27.6966,
  lng: 85.3591,
};
const DEL = {
  city: "델리",
  country: "인도",
  code: "DEL",
  name: "인디라간디국제공항",
  lat: 28.5562,
  lng: 77.1,
};
const MAA = {
  city: "첸나이",
  country: "인도",
  code: "MAA",
  name: "첸나이공항",
  lat: 12.994,
  lng: 80.17,
};
const BOM = {
  city: "뭄바이",
  country: "인도",
  code: "BOM",
  name: "차트라파티시바지국제공항",
  lat: 19.0896,
  lng: 72.8656,
};
const BLR = {
  city: "방갈로",
  country: "인도",
  code: "BLR",
  name: "방갈로르공항",
  lat: 13.1986,
  lng: 77.7066,
};
const CCU = {
  city: "콜카타",
  country: "인도",
  code: "CCU",
  name: "네타지수바스찬드라보스국제공항",
  lat: 22.654,
  lng: 88.4467,
};
const ULN = {
  city: "울란바토르",
  country: "몽골",
  code: "ULN",
  name: "울란바토르공항",
  lat: 47.8431,
  lng: 106.7665,
};
const MLE = {
  city: "말레",
  country: "몰디브",
  code: "MLE",
  name: "말레국제공항",
  lat: 4.1918,
  lng: 73.5299,
};
const CMB = {
  city: "콜롬보",
  country: "스리랑카",
  code: "CMB",
  name: "반다라나이케국제공항",
  lat: 7.1808,
  lng: 79.8844,
};
const TAS = {
  city: "타쉬켄트",
  country: "우즈베키스탄",
  code: "TAS",
  name: "타쉬켄트국제공항",
  lat: 41.2618,
  lng: 69.2813,
};

const GRU = {
  city: "상파울루",
  country: "브라질",
  code: "GRU",
  name: "과를호스공항",
  lat: -23.4356,
  lng: -46.4731,
};
const GIG = {
  city: "리우 데 자네이로",
  country: "브라질",
  code: "GIG",
  name: "리오데자네이로공항",
  lat: -22.8093,
  lng: -43.2503,
};
const LIM = {
  city: "리마",
  country: "페루",
  code: "LIM",
  name: "호르헤차베스국제공항",
  lat: -12.0247,
  lng: -77.114,
};
const MEX = {
  city: "멕시코 시티",
  country: "멕시코",
  code: "MEX",
  name: "베니토후아레스국제공항",
  lat: 19.4363,
  lng: -99.0721,
};
const CUN = {
  city: "칸쿤",
  country: "멕시코",
  code: "CUN",
  name: "칸쿤국제공항",
  lat: 21.0364,
  lng: -86.8769,
};
const EZE = {
  city: "부에노스 아이레스",
  country: "아르헨티나",
  code: "EZE",
  name: "미니스트로피스타리니국제공항",
  lat: -34.815,
  lng: -58.5358,
};
const SCL = {
  city: "산티아고",
  country: "칠레",
  code: "SCL",
  name: "산티아고국제공항",
  lat: -33.3929,
  lng: -70.7858,
};
const BOG = {
  city: "보고타",
  country: "콜롬비아",
  code: "BOG",
  name: "엘도라도국제공항",
  lat: 4.7016,
  lng: -74.1469,
};
const HAV = {
  city: "하바나",
  country: "쿠바",
  code: "HAV",
  name: "호세마르티국제공항",
  lat: 22.9892,
  lng: -82.4094,
};
const UIO = {
  city: "키토",
  country: "에콰도르",
  code: "UIO",
  name: "키토국제공항",
  lat: -0.1292,
  lng: -78.3575,
};
const GUM = {
  city: "괌",
  country: "괌",
  code: "GUM",
  name: "앤토니오B.원팻국제공항",
  lat: 13.4834,
  lng: 144.7959,
};
const SYD = {
  city: "시드니",
  country: "호주",
  code: "SYD",
  name: "시드니공항",
  lat: -33.9399,
  lng: 151.1753,
};
const SPN = {
  city: "사이판",
  country: "사이판",
  code: "SPN",
  name: "사이판국제공항",
  lat: 15.119,
  lng: 145.7295,
};
const AKL = {
  city: "오클랜드",
  country: "뉴질랜드",
  code: "AKL",
  name: "오클랜드공항",
  lat: -37.008,
  lng: 174.7916,
};
const BNE = {
  city: "브리즈번",
  country: "호주",
  code: "BNE",
  name: "브리즈번공항",
  lat: -27.3842,
  lng: 153.1175,
};
const MEL = {
  city: "멜버른",
  country: "호주",
  code: "MEL",
  name: "툴라마린공항",
  lat: -37.669,
  lng: 144.8434,
};
const CHC = {
  city: "크라이스트쳐치",
  country: "뉴질랜드",
  code: "CHC",
  name: "크라이스트처치국제공항",
  lat: -43.4881,
  lng: 172.5344,
};
const CNS = {
  city: "케언즈",
  country: "호주",
  code: "CNS",
  name: "케언즈공항",
  lat: -16.8768,
  lng: 145.7546,
};
const ZQN = {
  city: "퀸스타운",
  country: "뉴질랜드",
  code: "ZQN",
  name: "퀸스타운공항",
  lat: -45.0211,
  lng: 168.7392,
};
const PER = {
  city: "퍼스",
  country: "호주",
  code: "PER",
  name: "퍼스공항",
  lat: -31.9385,
  lng: 115.9672,
};
const ROR = {
  city: "코로르",
  country: "팔라우",
  code: "ROR",
  name: "아리아이공항",
  lat: 7.367,
  lng: 134.544,
};

const LAX = {
  city: "로스앤젤레스",
  country: "미국",
  code: "LAX",
  name: "로스앤젤레스국제공항",
  lat: 33.9416,
  lng: -118.4085,
};
const HNL = {
  city: "호놀룰루",
  country: "미국",
  code: "HNL",
  name: "호놀룰루국제공항",
  lat: 21.3187,
  lng: -157.9225,
};
const JFK = {
  city: "뉴욕",
  country: "미국",
  code: "JFK",
  name: "존에프케네디국제공항",
  lat: 40.6413,
  lng: -73.7781,
};
const YVR = {
  city: "밴쿠버",
  country: "캐나다",
  code: "YVR",
  name: "밴쿠버국제공항",
  lat: 49.1947,
  lng: -123.1794,
};
const SFO = {
  city: "샌프란시스코",
  country: "미국",
  code: "SFO",
  name: "샌프란시스코국제공항",
  lat: 37.6215,
  lng: -122.388,
};
const YYZ = {
  city: "토론토",
  country: "캐나다",
  code: "YYZ",
  name: "토론토국제공항",
  lat: 43.6777,
  lng: -79.6248,
};
const LAS = {
  city: "라스베이거스",
  country: "미국",
  code: "LAS",
  name: "해리리드국제공항",
  lat: 36.084,
  lng: -115.1537,
};
const ORD = {
  city: "시카고",
  country: "미국",
  code: "ORD",
  name: "오헤어국제공항",
  lat: 41.9742,
  lng: -87.9073,
};
const SEA = {
  city: "시애틀",
  country: "미국",
  code: "SEA",
  name: "시애틀터코마국제공항",
  lat: 47.4502,
  lng: -122.3088,
};
const IAD = {
  city: "워싱턴",
  country: "미국",
  code: "IAD",
  name: "워싱턴덜레스국제공항",
  lat: 38.9531,
  lng: -77.4565,
};

const CDG = {
  city: "파리",
  country: "프랑스",
  code: "CDG",
  name: "샤를드골국제공항",
  lat: 49.0097,
  lng: 2.5479,
};
const LHR = {
  city: "런던",
  country: "영국",
  code: "LHR",
  name: "히드로공항",
  lat: 51.47,
  lng: -0.4543,
};
const BCN = {
  city: "바르셀로나",
  country: "스페인",
  code: "BCN",
  name: "바르셀로나공항",
  lat: 41.2975,
  lng: 2.0833,
};
const FRA = {
  city: "프랑크푸르트",
  country: "독일",
  code: "FRA",
  name: "프랑크푸르트국제공항",
  lat: 50.0333,
  lng: 8.5706,
};
const FCO = {
  city: "로마",
  country: "이탈리아",
  code: "FCO",
  name: "레오나르도다빈치공항",
  lat: 41.8003,
  lng: 12.2388,
};
const PRG = {
  city: "프라하",
  country: "체코",
  code: "PRG",
  name: "바츨라프하벨공항",
  lat: 50.1008,
  lng: 14.26,
};
const IST = {
  city: "이스탄불",
  country: "터키예",
  code: "IST",
  name: "이스탄불국제공항",
  lat: 40.9767,
  lng: 28.8156,
};
const MUC = {
  city: "뮌헨",
  country: "독일",
  code: "MUC",
  name: "뮌헨국제공항",
  lat: 48.3537,
  lng: 11.7748,
};
const MAD = {
  city: "마드리드",
  country: "스페인",
  code: "MAD",
  name: "바라하스국제공항",
  lat: 40.4936,
  lng: -3.5668,
};
const VVO = {
  city: "블라디보스토크",
  country: "러시아",
  code: "VVO",
  name: "블라디보스톡국제공항",
  lat: 43.3981,
  lng: 132.1482,
};
const SVO = {
  city: "모스크바",
  country: "러시아",
  code: "SVO",
  name: "셰레메티예보국제공항",
  lat: 55.9726,
  lng: 37.4147,
};
const VIE = {
  city: "비엔나",
  country: "오스트리아",
  code: "VIE",
  name: "비엔나국제공항",
  lat: 48.1102,
  lng: 16.5697,
};
const VCE = {
  city: "베니스",
  country: "이탈리아",
  code: "VCE",
  name: "마르코폴로공항",
  lat: 45.504,
  lng: 12.3385,
};
const ZRH = {
  city: "취리히",
  country: "스위스",
  code: "ZRH",
  name: "취리히공항",
  lat: 47.4647,
  lng: 8.5492,
};
const AMS = {
  city: "암스테르담",
  country: "네덜란드",
  code: "AMS",
  name: "스히폴공항",
  lat: 52.3081,
  lng: 4.7642,
};
const MXP = {
  city: "밀라노",
  country: "이탈리아",
  code: "MXP",
  name: "말펜사공항",
  lat: 45.6306,
  lng: 8.7281,
};
const WAW = {
  city: "바르샤바",
  country: "폴란드",
  code: "WAW",
  name: "바르샤바공항",
  lat: 52.1657,
  lng: 20.9671,
};
const ZAG = {
  city: "자그레브",
  country: "크로아티아",
  code: "ZAG",
  name: "자그레브공항",
  lat: 45.7453,
  lng: 16.06891,
};

const BKK = {
  city: "방콕",
  country: "태국",
  code: "BKK",
  name: "수완나품국제공항",
  lat: 13.69294,
  lng: 100.75071,
};
const DAD = {
  city: "다낭",
  country: "베트남",
  code: "DAD",
  name: "다낭국제공항",
  lat: 16.05382,
  lng: 108.20216,
};
const SGN = {
  city: "호치민시",
  country: "베트남",
  code: "SGN",
  name: "탄손누트국제공항",
  lat: 10.8188,
  lng: 106.6583,
};
const HKG = {
  city: "홍콩",
  country: "홍콩",
  code: "HKG",
  name: "홍콩국제공항",
  lat: 22.308,
  lng: 113.9185,
};
const TPE = {
  city: "타이베이",
  country: "대만",
  code: "TPE",
  name: "타이완타오위안국제공항",
  lat: 25.0762,
  lng: 121.2235,
};
const MNL = {
  city: "마닐라",
  country: "필리핀",
  code: "MNL",
  name: "니노이아키노국제공항",
  lat: 14.5076,
  lng: 121.0119,
};
const HAN = {
  city: "하노이",
  country: "베트남",
  code: "HAN",
  name: "노이바이국제공항",
  lat: 21.2217,
  lng: 105.8077,
};
const SIN = {
  city: "싱가포르",
  country: "싱가포르",
  code: "SIN",
  name: "창이국제공항",
  lat: 1.3644,
  lng: 103.9915,
};
const CEB = {
  city: "세부",
  country: "필리핀",
  code: "CEB",
  name: "막탄세부국제공항",
  lat: 10.3075,
  lng: 123.9792,
};
const CRK = {
  city: "클라크필드",
  country: "필리핀",
  code: "CRK",
  name: "클라크필드공항",
  lat: 15.186,
  lng: 120.56,
};
const BKI = {
  city: "코타키나발루",
  country: "말레이시아",
  code: "BKI",
  name: "코타키나발루공항",
  lat: 5.9372,
  lng: 116.0513,
};
const MFM = {
  city: "마카오",
  country: "마카오",
  code: "MFM",
  name: "마카오국제공항",
  lat: 22.1496,
  lng: 113.591,
};
const CXR = {
  city: "나트랑",
  country: "베트남",
  code: "CXR",
  name: "캠란공항",
  lat: 12.0075,
  lng: 109.2197,
};
const KUL = {
  city: "쿠알라룸푸르",
  country: "말레이시아",
  code: "KUL",
  name: "쿠알라룸푸르국제공항",
  lat: 2.7456,
  lng: 101.7099,
};
const HKT = {
  city: "푸켓",
  country: "태국",
  code: "HKT",
  name: "푸켓국제공항",
  lat: 8.1132,
  lng: 98.3167,
};

const PVG = {
  city: "상하이",
  country: "중국",
  code: "PVG",
  name: "푸동국제공항",
  lat: 31.1433,
  lng: 121.8052,
};
const CAN = {
  city: "광저우",
  country: "중국",
  code: "CAN",
  name: "광저우바이윈국제공항",
  lat: 23.3924,
  lng: 113.2988,
};
const PEK = {
  city: "베이징",
  country: "중국",
  code: "PEK",
  name: "베이징캐피탈국제공항",
  lat: 40.0799,
  lng: 116.6031,
};
const TAO = {
  city: "청도",
  country: "중국",
  code: "TAO",
  name: "청도교동국제공항",
  lat: 36.2689,
  lng: 120.3836,
};
const YNJ = {
  city: "연길",
  country: "중국",
  code: "YNJ",
  name: "연길공항",
  lat: 42.8881,
  lng: 129.4394,
};
const HGH = {
  city: "항주",
  country: "중국",
  code: "HGH",
  name: "항주공항",
  lat: 30.2298,
  lng: 120.4344,
};
const SHA = {
  city: "상하이",
  country: "중국",
  code: "SHA",
  name: "훙차오국제공항",
  lat: 31.1979,
  lng: 121.3363,
};
const SHE = {
  city: "심양",
  country: "중국",
  code: "SHE",
  name: "타오셴국제공항",
  lat: 41.6383,
  lng: 123.4831,
};
const DLC = {
  city: "대련",
  country: "중국",
  code: "DLC",
  name: "대련국제공항",
  lat: 38.9617,
  lng: 121.5386,
};

const KIX = {
  city: "오사카",
  country: "일본",
  code: "KIX",
  name: "간사이국제공항",
  lat: 34.4354,
  lng: 135.243,
};
const NRT = {
  city: "도쿄",
  country: "일본",
  code: "NRT",
  name: "나리타국제공항",
  lat: 35.7647,
  lng: 140.3863,
};
const HND = {
  city: "도쿄",
  country: "일본",
  code: "HND",
  name: "하네다국제공항",
  lat: 35.5494,
  lng: 139.7798,
};
const FUK = {
  city: "후쿠오카",
  country: "일본",
  code: "FUK",
  name: "후쿠오카공항",
  lat: 33.585,
  lng: 130.45,
};
const OKA = {
  city: "오키나와",
  country: "일본",
  code: "OKA",
  name: "나하공항",
  lat: 26.1958,
  lng: 127.6469,
};
const CTS = {
  city: "삿포로",
  country: "일본",
  code: "CTS",
  name: "치토세공항",
  lat: 42.7752,
  lng: 141.6924,
};
const NGO = {
  city: "나고야",
  country: "일본",
  code: "NGO",
  name: "주부국제공항",
  lat: 35.2506,
  lng: 136.9241,
};

// ------------------------------------ 대륙별 국가 목록 -----------------------------------------//
//아프리카
const Egypt = {
  name_en: "Egypt",
  name_ko: "이집트",
  code: "EGP",
  airports: [CAI],
};
const SouthAfrica = {
  name_en: "South Africa",
  name_ko: "남아프리카공화국",
  code: "SAC",
  airports: [JNB, CPT],
};
const Kenya = {
  name_en: "Kenya",
  name_ko: "케냐",
  code: "KNA",
  airports: [NBO],
};
const Algeria = {
  name_en: "Algeria",
  name_ko: "알제리",
  code: "AGR",
  airports: [ALG],
};
const Morocco = {
  name_en: "Morocco",
  name_ko: "모로코",
  code: "MRC",
  airports: [CMN],
};
const Nigeria = {
  name_en: "Nigeria",
  name_ko: "나이지리아",
  code: "NGR",
  airports: [LOS],
};
const Ghana = {
  name_en: "Ghana",
  name_ko: "가나",
  code: "GNA",
  airports: [ACC],
};
const Tanzania = {
  name_en: "Tanzania",
  name_ko: "탄자니아",
  code: "TZN",
  airports: [DAR],
};
const Tunisia = {
  name_en: "Tunisia",
  name_ko: "튀니지",
  code: "TNS",
  airports: [TUN],
};
//중동
const UnitedArabEmirates = {
  name_en: "United Arab Emirates",
  name_ko: "아랍에미리트",
  code: "UAE",
  airports: [DXB, AUH],
};
const Israel = {
  name_en: "Israel",
  name_ko: "이스라엘",
  code: "IRE",
  airports: [TLV],
};
const Iran = { name_en: "Iran", name_ko: "이란", code: "IRN", airports: [IKA] };
const Qatar = {
  name_en: "Qatar",
  name_ko: "카타르",
  code: "QTR",
  airports: [DOH],
};
const Jordan = {
  name_en: "Jordan",
  name_ko: "요르단",
  code: "JDN",
  airports: [AMM],
};
const Kuwait = {
  name_en: "Kuwait",
  name_ko: "쿠웨이트",
  code: "KWT",
  airports: [KWI],
};
const SaudiArabia = {
  name_en: "Saudi Arabia",
  name_ko: "사우디아라비아",
  code: "SAB",
  airports: [DMM, JED, RUH],
};
const Nepal = {
  name_en: "Nepal",
  name_ko: "네팔",
  code: "NPL",
  airports: [KTM],
};
const India = {
  name_en: "India",
  name_ko: "인도",
  code: "IDA",
  airports: [DEL, MAA, BOM, BLR, CCU],
};
const Mongolia = {
  name_en: "Mongolia",
  name_ko: "몽골",
  code: "MGL",
  airports: [ULN],
};
const Maldives = {
  name_en: "Maldives",
  name_ko: "몰디브",
  code: "MDV",
  airports: [MLE],
};
const SriLanka = {
  name_en: "Sri Lanka",
  name_ko: "스리랑카",
  code: "SLK",
  airports: [CMB],
};
const Uzbekistan = {
  name_en: "Uzbekistan",
  name_ko: "우즈베키스탄",
  code: "UZB",
  airports: [TAS],
};
const Turkey = {
  name_en: "Turkey",
  name_ko: "튀르키예",
  code: "TRK",
  airports: [IST],
};
//남아메리카
const Brazil = {
  name_en: "Brazil",
  name_ko: "브라질",
  code: "BRZ",
  airports: [GRU, GIG],
};
const Peru = { name_en: "Peru", name_ko: "페루", code: "PRU", airports: [LIM] };
const Argentina = {
  name_en: "Argentina",
  name_ko: "아르헨티나",
  code: "AGT",
  airports: [EZE],
};
const Chile = {
  name_en: "Chile",
  name_ko: "칠레",
  code: "CHL",
  airports: [SCL],
};
const Colombia = {
  name_en: "Colombia",
  name_ko: "콜롬비아",
  code: "CLB",
  airports: [BOG],
};
const Ecuador = {
  name_en: "Ecuador",
  name_ko: "에콰도르",
  code: "ECD",
  airports: [UIO],
};
//오세아니아
const Guam = { name_en: "Guam", name_ko: "괌", code: "GUA", airports: [GUM] };
const Australia = {
  name_en: "Australia",
  name_ko: "호주",
  code: "ARL",
  airports: [SYD, BNE, MEL, CNS, PER],
};
const NorthernMarianaIslands = {
  name_en: "Northern Mariana Islands",
  name_ko: "북마리아나제도",
  code: "NMI",
  airports: [SPN],
};
const NewZealand = {
  name_en: "New Zealand",
  name_ko: "뉴질랜드",
  code: "NZL",
  airports: [AKL, CHC, ZQN],
};
const Palau = {
  name_en: "Palau",
  name_ko: "팔라우",
  code: "PLU",
  airports: [ROR],
};
//북아메리카
const Mexico = {
  name_en: "Mexico",
  name_ko: "멕시코",
  code: "MXC",
  airports: [MEX, CUN],
};
const Cuba = { name_en: "Cuba", name_ko: "쿠바", code: "CUB", airports: [HAV] };
const UnitedStatesOfAmerica = {
  name_en: "United States of America",
  name_ko: "미국",
  code: "USA",
  airports: [LAX, HNL, JFK, SFO, LAS, ORD, SEA, IAD],
};
const Canada = {
  name_en: "Canada",
  name_ko: "캐나다",
  code: "CND",
  airports: [YVR, YYZ],
};
//유럽
const France = {
  name_en: "France",
  name_ko: "프랑스",
  code: "FRC",
  airports: [CDG],
};
const UnitedKingdom = {
  name_en: "United Kingdom",
  name_ko: "영국",
  code: "UKD",
  airports: [LHR],
};
const Spain = {
  name_en: "Spain",
  name_ko: "스페인",
  code: "SPI",
  airports: [BCN, MAD],
};
const Germany = {
  name_en: "Germany",
  name_ko: "독일",
  code: "GMN",
  airports: [FRA, MUC],
};
const Italy = {
  name_en: "Italy",
  name_ko: "이탈리아",
  code: "ITL",
  airports: [FCO, VCE, MXP],
};
const CzechRepublic = {
  name_en: "Czech Republic",
  name_ko: "체코",
  code: "CCR",
  airports: [PRG],
};
const Russia = {
  name_en: "Russia",
  name_ko: "러시아",
  code: "RSA",
  airports: [VVO, SVO],
};
const Austria = {
  name_en: "Austria",
  name_ko: "오스트리아",
  code: "AST",
  airports: [VIE],
};
const Switzerland = {
  name_en: "Switzerland",
  name_ko: "스위스",
  code: "SWS",
  airports: [ZRH],
};
const Netherlands = {
  name_en: "Netherlands",
  name_ko: "네덜란드",
  code: "NTL",
  airports: [AMS],
};
const Poland = {
  name_en: "Poland",
  name_ko: "폴란드",
  code: "PLD",
  airports: [WAW],
};
const Croatia = {
  name_en: "Croatia",
  name_ko: "크로아티아",
  code: "CRT",
  airports: [ZAG],
};
//동남아
const Thailand = {
  name_en: "Thailand",
  name_ko: "태국",
  code: "TIL",
  airports: [BKK, HKT],
};
const Vietnam = {
  name_en: "Vietnam",
  name_ko: "베트남",
  code: "VEN",
  airports: [DAD, SGN, HAN, CXR],
};
const HongKong = {
  name_en: "Hong Kong",
  name_ko: "홍콩",
  code: "HKG",
  airports: [HKG],
};
const Taiwan = {
  name_en: "Taiwan",
  name_ko: "대만",
  code: "TIW",
  airports: [TPE],
};
const Philippines = {
  name_en: "Philippines",
  name_ko: "필리핀",
  code: "PLP",
  airports: [MNL, CEB, CRK],
};
const Singapore = {
  name_en: "Singapore",
  name_ko: "싱가포르",
  code: "SGP",
  airports: [SIN],
};
const Malaysia = {
  name_en: "Malaysia",
  name_ko: "말레이시아",
  code: "MLS",
  airports: [BKI, KUL],
};
const Macau = {
  name_en: "Macau",
  name_ko: "마카오",
  code: "MCU",
  airports: [MFM],
};
const China = {
  name_en: "China",
  name_ko: "중국",
  code: "PRC",
  airports: [PVG, CAN, PEK, TAO, YNJ, HGH, SHA, SHE, DLC],
};
const Japan = {
  name_en: "Japan",
  name_ko: "일본",
  code: "JPN",
  airports: [KIX, NRT, HND, FUK, OKA, CTS, NGO],
};

// --------------------------------- 대륙 목록 ----------------------------------------//
const Africa = [
  Egypt,
  SouthAfrica,
  Kenya,
  Algeria,
  Morocco,
  Nigeria,
  Ghana,
  Tanzania,
  Tunisia,
];

const NorthAmerica = [Mexico, Cuba, UnitedStatesOfAmerica, Canada];
const SouthAmerica = [Brazil, Peru, Argentina, Chile, Colombia, Ecuador];
const Asia = [
  UnitedArabEmirates,
  Israel,
  Iran,
  Qatar,
  Jordan,
  Kuwait,
  SaudiArabia,
  Nepal,
  India,
  Mongolia,
  Maldives,
  SriLanka,
  Uzbekistan,
  Turkey,
  Thailand,
  Vietnam,
  HongKong,
  Taiwan,
  Philippines,
  Singapore,
  Malaysia,
  Macau,
  China,
  Japan,
];
const Europe = [
  France,
  UnitedKingdom,
  Spain,
  Germany,
  Italy,
  CzechRepublic,
  Russia,
  Austria,
  Switzerland,
  Netherlands,
  Poland,
  Croatia,
];
const Oceania = [Guam, Australia, NorthernMarianaIslands, NewZealand, Palau];

export const relationOfAirport = [
  {
    name: "North America",
    name_ko: "북 아메리카",
    code: "NAR",
    countries: NorthAmerica,
  },
  {
    name: "South America",
    name_ko: "남 아메리카",
    code: "SAR",
    countries: SouthAmerica,
  },
  { name: "Africa", name_ko: "아프리카", code: "ARC", countries: Africa },
  { name: "Asia", name_ko: "아시아", code: "ASA", countries: Asia },
  { name: "Europe", name_ko: "유럽", code: "ERP", countries: Europe },
  { name: "Oceania", name_ko: "오세아니아", code: "OCA", countries: Oceania },
];
