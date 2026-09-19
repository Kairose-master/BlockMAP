// 시드 데이터. 출시 전 모든 도메인은 사람이 다시 검증해야 한다 (README 참고).

export type CoinSymbol =
  | "BTC" | "ETH" | "SOL" | "XRP" | "USDT" | "USDC" | "WLD"
  | "DOGE" | "ADA" | "TRX" | "NEAR" | "SUI" | "ARB" | "UNI"
  | "LINK" | "XLM" | "AVAX" | "POL" | "BAT"
  | "BCH" | "SHIB" | "PEPE" | "APT" | "HBAR" | "STX" | "DOT"
  | "ATOM" | "ENS" | "AAVE" | "OP" | "JUP" | "SAND";

export type Coin = {
  symbol: CoinSymbol;
  name: string;
  market: string; // 업비트 마켓 코드
  color: string;
  note: string; // 이 코인이 실제로 얼마나 쓰이는지에 대한 솔직한 한 줄
  about: string; // 이 코인이 무엇인지, 처음 듣는 사람을 위한 한두 문장
};

export const COINS: Coin[] = [
  { symbol: "BTC", name: "비트코인", market: "KRW-BTC", color: "#f7931a", note: "결제·후원·구독까지 받는 곳이 가장 넓은 코인. 소액 결제는 대부분 라이트닝으로 이뤄지고, 최근엔 스테이킹까지 생겼어요.", about: "2009년에 나온 첫 암호화폐. 발행량이 2,100만 개로 고정돼 있어 '디지털 금'으로 불려요." },
  { symbol: "ETH", name: "이더리움", market: "KRW-ETH", color: "#8c9eff", note: "쓸 곳이 가장 많은 코인. 스테이킹, 이름 주소, NFT, 투표까지 web3의 기본 통화예요.", about: "이더리움 네트워크의 기본 코인. 앱(스마트 계약)을 돌릴 때 수수료로 쓰여서 web3의 기름 같은 존재예요." },
  { symbol: "SOL", name: "솔라나", market: "KRW-SOL", color: "#14f195", note: "수수료가 몇 원이라 소액으로 이것저것 해보기 좋아요. 스테이킹·NFT·이름 주소가 중심.", about: "빠르고 수수료가 싼 솔라나 네트워크의 기본 코인. 거래 한 번에 몇 원이 듭니다." },
  { symbol: "XRP", name: "리플", market: "KRW-XRP", color: "#9aa4ad", note: "보유자에 비해 쓸 곳은 적어요. 결제·후원, XRP 레저 안의 NFT, 그리고 플레어를 거치는 예치(위험 높음) 정도입니다.", about: "은행 간 송금을 빠르게 하려고 만든 XRP 레저의 코인. 한국에서 보유자가 특히 많아요." },
  { symbol: "USDT", name: "테더", market: "KRW-USDT", color: "#26a17b", note: "가격이 안 변해서 결제·예치에 실제로 많이 쓰여요. 어느 네트워크의 USDT인지 꼭 확인하세요.", about: "1개가 1달러에 맞춰진 스테이블코인. 세계에서 가장 많이 거래되는 코인이에요." },
  { symbol: "USDC", name: "USD코인", market: "KRW-USDC", color: "#2775ca", note: "가장 많은 서비스가 받는 달러 코인. 결제·예치·후원 어디서나 무난합니다.", about: "미국 서클이 발행하는 달러 스테이블코인. 준비금 공개가 투명한 편이라 서비스들이 가장 널리 받아요." },
  { symbol: "WLD", name: "월드코인", market: "KRW-WLD", color: "#e6e6e6", note: "'사람 인증'(World ID)이 본체예요. 코인은 공식 앱의 미니앱 결제, 교환, 투표에 쓰입니다.", about: "홍채로 '사람임'을 증명하는 월드 네트워크의 코인. 인증한 사람에게 나눠줍니다." },
  { symbol: "DOGE", name: "도지코인", market: "KRW-DOGE", color: "#c2a633", note: "밈 코인치고는 받는 곳이 꽤 있어요. 기프트카드·여행·후원에 쓸 수 있습니다.", about: "2013년 농담으로 시작한 밈 코인. 인터넷에서 소액 팁을 주고받는 문화에서 컸어요." },
  { symbol: "ADA", name: "에이다", market: "KRW-ADA", color: "#3468d1", note: "지갑에서 바로 되는 스테이킹이 핵심. 카르다노 안에서 교환·예치·이름 주소까지는 해볼 수 있어요.", about: "카르다노 네트워크의 기본 코인. 학술 연구 기반의 느리지만 꼼꼼한 개발로 알려져 있어요." },
  { symbol: "TRX", name: "트론", market: "KRW-TRX", color: "#eb0029", note: "USDT를 싸게 보내는 길로 가장 많이 쓰여요. TRX 자체는 스테이킹·교환과 일부 결제.", about: "트론 네트워크의 기본 코인. 트론은 USDT 송금에 가장 많이 쓰이는 네트워크예요." },
  { symbol: "NEAR", name: "니어", market: "KRW-NEAR", color: "#00ec97", note: "스테이킹이 중심이고, 니어 안에서 교환·NFT, 체인을 넘나드는 교환(니어 인텐트)을 해볼 수 있어요.", about: "니어 프로토콜의 기본 코인. 주소가 0x… 대신 이름.near 형태라 쓰기 쉬운 편입니다." },
  { symbol: "SUI", name: "수이", market: "KRW-SUI", color: "#4da2ff", note: "지갑 안 스테이킹, 교환·예치, 이름 주소, NFT. 생태계는 젊지만 기본은 갖췄어요.", about: "메타(페이스북) 출신 개발자들이 만든 수이 네트워크의 기본 코인." },
  { symbol: "ARB", name: "아비트럼", market: "KRW-ARB", color: "#28a0f0", note: "원래 '투표권'으로 만든 코인. 거버넌스 투표·위임이 본래 용도예요.", about: "이더리움 L2 아비트럼의 거버넌스 토큰. 아비트럼 수수료는 ARB가 아니라 ETH로 내요." },
  { symbol: "UNI", name: "유니스왑", market: "KRW-UNI", color: "#ff007a", note: "유니스왑의 투표권. 직접 쓸 곳은 투표·위임과 후원 정도입니다.", about: "최대 탈중앙 거래소 유니스왑의 거버넌스 토큰." },
  { symbol: "LINK", name: "체인링크", market: "KRW-LINK", color: "#2a5ada", note: "개인이 직접 쓸 곳은 많지 않아요. 스테이킹은 풀이 가득 차 자리가 날 때만 가능합니다.", about: "블록체인에 바깥세상 데이터(가격 등)를 전해주는 체인링크의 코인. 주로 서비스 운영자들끼리 주고받아요." },
  { symbol: "XLM", name: "스텔라루멘", market: "KRW-XLM", color: "#b7bcc4", note: "수수료가 사실상 0원인 송금용 코인. 받는 곳은 손에 꼽지만 스텔라 안에서 교환·예치는 돼요.", about: "스텔라 네트워크의 기본 코인. 국경 간 소액 송금을 목표로 만들어졌고 수수료가 사실상 0원이에요." },
  { symbol: "AVAX", name: "아발란체", market: "KRW-AVAX", color: "#e84142", note: "스테이킹이 중심. 직접 위임은 최소 25개가 필요해서 소액은 유동 스테이킹을 써요. 교환·예치도 됩니다.", about: "아발란체 네트워크의 기본 코인. 수수료로 쓰이고 스테이킹할 수 있어요." },
  { symbol: "POL", name: "폴리곤", market: "KRW-POL", color: "#8247e5", note: "폴리곤 수수료로 쓰이는 코인. 스테이킹과 일부 결제·후원에 쓸 수 있어요.", about: "폴리곤 네트워크의 기본 코인. 예전 이름은 MATIC이에요." },
  { symbol: "BAT", name: "베이직어텐션토큰", market: "KRW-BAT", color: "#ff5000", note: "브레이브 브라우저의 보상 코인. 한국은 보상 지원 지역이 아니라 쓸 곳이 더 좁아요.", about: "광고를 막아주는 브레이브 브라우저의 보상 코인. 광고를 본 만큼 받고, 창작자에게 후원할 수 있게 설계됐어요." },
  { symbol: "BCH", name: "비트코인캐시", market: "KRW-BCH", color: "#0ac18e", note: "소액 결제용으로 만들어진 코인. VPN·여행·후원처럼 받는 곳이 몇 군데 있어요.", about: "2017년 비트코인에서 갈라져 나온 코인. 블록을 키워 수수료를 1원 안팎으로 낮췄어요." },
  { symbol: "SHIB", name: "시바이누", market: "KRW-SHIB", color: "#ffa409", note: "받는 곳이 조금 있을 뿐, 본질적으로는 교환용이에요.", about: "도지코인을 따라 만든 밈 코인. 이더리움 위의 토큰(ERC-20)이에요." },
  { symbol: "PEPE", name: "페페", market: "KRW-PEPE", color: "#4c9540", note: "솔직히 쓸 곳이 거의 없어요. 여행 예약과 후원에서 받아주는 정도입니다.", about: "개구리 밈에서 나온 밈 코인. 이더리움 위의 토큰이고, 만든 쪽도 '쓰임새는 없다'고 밝힌 코인입니다." },
  { symbol: "APT", name: "앱토스", market: "KRW-APT", color: "#d8d8d8", note: "스테이킹, 교환, 이름 주소, NFT. 생태계가 아직 작아요.", about: "메타(페이스북)의 블록체인 프로젝트 출신이 만든 앱토스 네트워크의 기본 코인." },
  { symbol: "HBAR", name: "헤데라", market: "KRW-HBAR", color: "#9aa0a6", note: "지갑 안 스테이킹이 중심. 헤데라 안에서 교환·예치 정도를 더 해볼 수 있어요.", about: "구글·IBM 같은 기업들이 운영위원으로 참여하는 헤데라 네트워크의 기본 코인." },
  { symbol: "STX", name: "스택스", market: "KRW-STX", color: "#fc6432", note: "비트코인 보상을 받는 '스태킹'이 핵심 용도. 스택스 안의 교환과 NFT도 있어요.", about: "비트코인 위에 앱을 올리는 스택스 네트워크의 코인." },
  { symbol: "DOT", name: "폴카닷", market: "KRW-DOT", color: "#e6007a", note: "풀 스테이킹과 안건 투표가 중심. 폴카닷 안에서 교환도 됩니다.", about: "여러 블록체인을 잇는 폴카닷 네트워크의 기본 코인. 보유자 투표로 예산까지 정해요." },
  { symbol: "ATOM", name: "코스모스", market: "KRW-ATOM", color: "#6f7390", note: "스테이킹(지갑 또는 유동)과 코스모스 생태계 안에서의 교환이 중심이에요.", about: "블록체인끼리 연결하는 코스모스 생태계의 중심 코인." },
  { symbol: "ENS", name: "이더리움네임서비스", market: "KRW-ENS", color: "#5298ff", note: "이더리움 이름 서비스의 투표권. 이름 주소를 사는 데는 ENS가 아니라 ETH를 써요.", about: "이더리움 이름 서비스(내이름.eth)를 운영하는 ENS DAO의 거버넌스 토큰." },
  { symbol: "AAVE", name: "에이브", market: "KRW-AAVE", color: "#b6509e", note: "에이브의 투표권이자 안전 기금 스테이킹용 코인.", about: "최대 예치·대출 서비스 에이브의 거버넌스 토큰." },
  { symbol: "OP", name: "옵티미즘", market: "KRW-OP", color: "#ff0420", note: "옵티미즘의 투표권. 투표·위임이 본래 용도예요.", about: "이더리움 L2 옵티미즘의 거버넌스 토큰. 옵티미즘 수수료는 OP가 아니라 ETH로 내요." },
  { symbol: "JUP", name: "주피터", market: "KRW-JUP", color: "#c7f284", note: "주피터의 투표권. 맡기고 투표하는 것이 거의 유일한 용도입니다.", about: "솔라나 최대 거래 서비스 주피터의 거버넌스 토큰." },
  { symbol: "SAND", name: "샌드박스", market: "KRW-SAND", color: "#00adef", note: "더 샌드박스 게임 안의 화폐. 게임을 안 하면 쓸 일이 없어요.", about: "블록 모양 메타버스 게임 '더 샌드박스'의 게임 내 화폐." },
];

// 거래소처럼 '어떤 코인이든' 해당하는 곳에 쓴다
const ALL_COINS = COINS.map((c) => c.symbol);

export const COIN_BY_SYMBOL = Object.fromEntries(
  COINS.map((c) => [c.symbol, c]),
) as Record<CoinSymbol, Coin>;

export type DistrictId =
  | "start"
  | "earn"
  | "pay"
  | "collect"
  | "identity"
  | "join"
  | "transit"
  | "swap";

export type District = {
  id: DistrictId;
  name: string;
  tagline: string;
  hue: number;
  // 아래는 layout()이 쓰임처 개수에 맞춰 계산한다 (월드 좌표, 블록의 왼쪽 위 기준)
  x: number;
  y: number;
  w: number;
  h: number;
};

const DISTRICT_DEFS: Omit<District, "x" | "y" | "w" | "h">[] = [
  { id: "start", name: "출발지", tagline: "거래소에서 내 지갑으로", hue: 80 },
  { id: "transit", name: "환승역", tagline: "수수료 싼 길로 갈아타기", hue: 200 },
  { id: "earn", name: "돈 굴리기", tagline: "맡기고 이자 받기", hue: 140 },
  { id: "swap", name: "코인 바꾸기", tagline: "거래소 없이 지갑에서 교환", hue: 175 },
  { id: "pay", name: "결제·쇼핑", tagline: "코인으로 진짜 사보기", hue: 30 },
  { id: "collect", name: "수집·티켓", tagline: "NFT, 입장권, 방문 도장", hue: 300 },
  { id: "identity", name: "신원·이름", tagline: "내 이름으로 된 주소", hue: 260 },
  { id: "join", name: "참여·후원", tagline: "투표하고, 후원하고, 떠들기", hue: 350 },
];

export type Review = {
  id: string;
  author: string;
  body: string;
  costKRW?: number;
  minutes?: number;
  createdAt: string;
  mine?: boolean;
  sample?: boolean; // 실제 이용자가 아니라 서비스가 넣어둔 예시 후기
};

export type Place = {
  id: string;
  name: string;
  domain: string; // 검증된 공식 도메인
  url: string;
  district: DistrictId;
  // 타일의 중심과 너비. layout()이 계산한다
  x: number;
  y: number;
  w: number;
  action: string; // 여기서 하는 일, 한 줄
  desc: string;
  coins: CoinSymbol[]; // 이 코인이 있으면 쓸 수 있다
  minKRW: number; // 대략 이 정도부터 해볼 수 있다 (0 = 무료)
  difficulty: 1 | 2 | 3;
  minutes: number;
  steps: string[];
  offline?: boolean; // 실제 지도로 이어지는 곳
  reviews: Review[];
};

// 시드 후기는 전부 '예시'로 표시된다. 실제 후기가 쌓이면 지운다.
const r = (
  id: string,
  author: string,
  body: string,
  extra: Partial<Review> = {},
): Review => ({ id, author, body, createdAt: "2026-09-10", sample: true, ...extra });

const PLACE_DEFS: Omit<Place, "x" | "y" | "w">[] = [
  // 출발지
  {
    id: "upbit", name: "업비트", domain: "upbit.com", url: "https://upbit.com",
    district: "start",
    action: "원화로 코인 사기",
    desc: "국내 최대 거래소. 여기 있는 코인은 아직 '내 지갑'이 아니에요. 쓰려면 개인 지갑으로 출금해야 합니다.",
    coins: ALL_COINS,
    minKRW: 5000, difficulty: 1, minutes: 10,
    steps: ["케이뱅크 계좌 연결", "원화 입금", "원하는 코인 매수"],
    reviews: [r("upbit-1", "민트초코", "가입은 쉬운데 첫 출금은 72시간 제한 있어요. 미리 해두세요.", { minutes: 10 })],
  },
  {
    id: "bithumb", name: "빗썸", domain: "bithumb.com", url: "https://www.bithumb.com",
    district: "start",
    action: "원화로 코인 사기",
    desc: "국내 2위 거래소. 업비트와 상장 코인이 조금 달라요.",
    coins: ALL_COINS,
    minKRW: 5000, difficulty: 1, minutes: 10,
    steps: ["은행 계좌 연결", "원화 입금", "코인 매수"],
    reviews: [],
  },
  {
    id: "metamask", name: "메타마스크", domain: "metamask.io", url: "https://metamask.io",
    district: "start",
    action: "이더리움 지갑 만들기",
    desc: "이더리움 계열 서비스의 출입증. 지갑을 만드는 것 자체는 무료고, 거래소에서 여기로 출금하면 '진짜 내 코인'이 됩니다.",
    coins: ["ETH", "USDT", "USDC", "WLD", "ARB", "UNI", "LINK", "POL", "BAT", "SHIB", "PEPE", "ENS", "AAVE", "OP", "SAND"],
    minKRW: 0, difficulty: 2, minutes: 15,
    steps: ["공식 사이트에서 앱/확장 설치", "복구 문구 12단어를 종이에 적기", "거래소에서 내 주소로 소액 출금해보기"],
    reviews: [r("mm-1", "가스비요정", "복구 문구 캡처하지 마세요. 진짜 종이에 쓰세요.", { minutes: 15, costKRW: 0 })],
  },
  {
    id: "phantom", name: "팬텀", domain: "phantom.com", url: "https://phantom.com",
    district: "start",
    action: "솔라나 지갑 만들기",
    desc: "솔라나 생태계의 기본 지갑. 비트코인·이더리움 주소도 같이 만들어줍니다.",
    coins: ["SOL", "BTC", "ETH", "USDC"],
    minKRW: 0, difficulty: 2, minutes: 10,
    steps: ["앱 설치", "복구 문구 백업", "거래소에서 SOL 소액 출금"],
    reviews: [],
  },

  // 환승역
  {
    id: "base", name: "베이스", domain: "base.org", url: "https://www.base.org",
    district: "transit",
    action: "수수료 싼 L2로 옮기기",
    desc: "이더리움 위에 지은 고속도로. 같은 ETH를 쓰는데 수수료가 수십 원 수준이에요.",
    coins: ["ETH", "USDC"],
    minKRW: 10000, difficulty: 2, minutes: 10,
    steps: ["지갑에 Base 네트워크 추가", "브릿지로 ETH 일부 이동", "Base 위 서비스 이용"],
    reviews: [r("base-1", "L2러버", "메인넷에서 3천원 나오던 게 여기선 20원.", { costKRW: 20 })],
  },
  {
    id: "arbitrum", name: "아비트럼", domain: "arbitrum.io", url: "https://arbitrum.io",
    district: "transit",
    action: "수수료 싼 L2로 옮기기",
    desc: "가장 많이 쓰이는 이더리움 L2 중 하나. 디파이 서비스가 많이 입점해 있어요.",
    coins: ["ETH", "USDT", "USDC", "ARB"],
    minKRW: 10000, difficulty: 2, minutes: 15,
    steps: ["공식 브릿지 접속", "ETH 이동 (약 15분)", "아비트럼 위 서비스 이용"],
    reviews: [],
  },

  // 돈 굴리기
  {
    id: "lido", name: "리도", domain: "lido.fi", url: "https://lido.fi",
    district: "earn",
    action: "ETH 맡기고 이자 받기",
    desc: "ETH를 스테이킹하면 연 3% 안팎의 보상이 붙어요. 언제든 뺄 수 있는 stETH로 돌려받습니다.",
    coins: ["ETH"],
    minKRW: 10000, difficulty: 2, minutes: 5,
    steps: ["지갑 연결", "맡길 ETH 수량 입력", "서명하면 끝. stETH가 들어옵니다"],
    reviews: [r("lido-1", "존버장인", "지갑에 그냥 두느니 이게 낫죠. 5분 컷.", { minutes: 5, costKRW: 2500 })],
  },
  {
    id: "uniswap", name: "유니스왑", domain: "uniswap.org", url: "https://app.uniswap.org",
    district: "swap",
    action: "코인끼리 바로 바꾸기",
    desc: "거래소 없이 지갑에서 지갑으로 코인을 교환. 회원가입이 없습니다.",
    coins: ["ETH", "USDT", "USDC", "WLD", "UNI", "ARB", "LINK", "SHIB", "PEPE", "ENS", "AAVE", "OP", "BAT", "SAND"],
    minKRW: 5000, difficulty: 2, minutes: 5,
    steps: ["지갑 연결", "바꿀 코인 선택", "예상 수량 확인 후 서명"],
    reviews: [],
  },
  {
    id: "aave", name: "에이브", domain: "aave.com", url: "https://aave.com",
    district: "earn",
    action: "달러 코인 예치하고 이자 받기",
    desc: "은행 예금처럼 스테이블코인을 맡기면 이자가 실시간으로 붙습니다.",
    coins: ["USDT", "USDC", "ETH", "LINK", "AAVE", "AVAX", "ARB"],
    minKRW: 10000, difficulty: 3, minutes: 10,
    steps: ["지갑 연결", "Supply에서 자산 선택", "승인 + 예치 서명 2번"],
    reviews: [],
  },
  {
    id: "jito", name: "지토", domain: "jito.network", url: "https://www.jito.network",
    district: "earn",
    action: "SOL 맡기고 이자 받기",
    desc: "솔라나판 스테이킹. 수수료가 거의 없어서 소액으로 해보기 좋아요.",
    coins: ["SOL"],
    minKRW: 5000, difficulty: 2, minutes: 5,
    steps: ["팬텀 지갑 연결", "SOL 수량 입력", "JitoSOL 수령"],
    reviews: [],
  },

  // 결제·쇼핑
  {
    id: "bitrefill", name: "비트리필", domain: "bitrefill.com", url: "https://www.bitrefill.com",
    district: "pay",
    action: "코인으로 기프티콘 사기",
    desc: "코인으로 상품권·기프티콘을 삽니다. '코인으로 커피 사먹기'의 가장 쉬운 길.",
    coins: ["BTC", "ETH", "SOL", "DOGE", "USDT", "USDC"],
    minKRW: 5000, difficulty: 1, minutes: 5,
    steps: ["상품 선택", "결제 코인 선택", "지갑에서 QR/주소로 전송"],
    reviews: [r("br-1", "라떼는말이야", "USDT로 커피 쿠폰 샀어요. 1분 만에 코드 옴.", { minutes: 3, costKRW: 5000 })],
  },
  {
    id: "travala", name: "트라발라", domain: "travala.com", url: "https://www.travala.com",
    district: "pay",
    action: "코인으로 호텔·항공 예약",
    desc: "전 세계 숙소와 항공권을 코인으로 결제하는 여행 예약 사이트.",
    coins: ["BTC", "ETH", "SOL", "XRP", "USDT", "USDC", "DOGE", "ADA", "TRX", "POL", "LINK", "XLM", "NEAR", "SUI", "BCH", "SHIB", "PEPE", "APT", "HBAR", "STX", "DOT", "ATOM", "ARB"],
    minKRW: 50000, difficulty: 1, minutes: 10,
    steps: ["숙소 검색", "결제 수단에서 코인 선택", "지갑에서 전송"],
    reviews: [],
  },
  {
    id: "btcmap", name: "BTC 맵", domain: "btcmap.org", url: "https://btcmap.org",
    district: "pay",
    action: "코인 받는 동네 가게 찾기",
    desc: "비트코인을 받는 오프라인 매장 지도. 여기서부터는 진짜 지도로 이어집니다.",
    coins: ["BTC"],
    minKRW: 3000, difficulty: 2, minutes: 5,
    steps: ["지도에서 내 주변 매장 찾기", "매장에서 라이트닝 결제 요청", "지갑으로 QR 스캔"],
    offline: true,
    reviews: [],
  },

  // 수집·티켓
  {
    id: "zora", name: "조라", domain: "zora.co", url: "https://zora.co",
    district: "collect",
    action: "몇백 원짜리 NFT 민팅",
    desc: "창작자의 게시물을 소액으로 수집. 첫 NFT를 경험하기 가장 싼 곳.",
    coins: ["ETH"],
    minKRW: 1000, difficulty: 2, minutes: 5,
    steps: ["지갑 연결", "마음에 드는 작품 선택", "Mint 누르고 서명"],
    reviews: [],
  },
  {
    id: "opensea", name: "오픈씨", domain: "opensea.io", url: "https://opensea.io",
    district: "collect",
    action: "NFT 사고팔기",
    desc: "가장 큰 NFT 마켓. 구경만 해도 됩니다.",
    coins: ["ETH", "SOL"],
    minKRW: 5000, difficulty: 2, minutes: 10,
    steps: ["지갑 연결", "컬렉션 탐색", "구매 서명"],
    reviews: [],
  },
  {
    id: "poap", name: "POAP", domain: "poap.xyz", url: "https://poap.xyz",
    district: "collect",
    action: "행사 참석 도장 모으기",
    desc: "밋업·행사에 가면 받는 방문 인증 배지. 받는 건 무료입니다.",
    coins: ["ETH"],
    minKRW: 0, difficulty: 1, minutes: 3,
    steps: ["행사장에서 QR 스캔", "지갑 주소 또는 이메일 입력", "배지 수령"],
    reviews: [r("poap-1", "밋업러", "지갑 없어도 이메일로 먼저 받을 수 있어요.", { costKRW: 0 })],
  },

  // 신원·이름
  {
    id: "ens", name: "ENS", domain: "ens.domains", url: "https://ens.domains",
    district: "identity",
    action: "0x… 대신 내이름.eth 만들기",
    desc: "긴 지갑 주소 대신 읽을 수 있는 이름을 등록. 5글자 이상은 1년에 약 $5.",
    coins: ["ETH"],
    minKRW: 12000, difficulty: 2, minutes: 10,
    steps: ["원하는 이름 검색", "기간 선택 후 2번 서명", "내 주소에 연결"],
    reviews: [r("ens-1", "이름부자", "가스비 포함 만오천원쯤. 송금받을 때 진짜 편함.", { costKRW: 15000, minutes: 10 })],
  },
  {
    id: "worldid", name: "월드 ID", domain: "world.org", url: "https://world.org",
    district: "identity",
    action: "'사람임'을 증명하기",
    desc: "홍채 인증으로 봇이 아닌 사람임을 증명. WLD는 인증한 사람에게 지급되고, 공식 앱(월드 머니)의 미니앱에서 쓰입니다.",
    coins: ["WLD"],
    minKRW: 0, difficulty: 2, minutes: 30,
    steps: ["World App 설치", "오브(Orb) 지점 예약·방문", "인증 후 앱에서 WLD 수령"],
    offline: true,
    reviews: [],
  },

  // 참여·후원
  {
    id: "snapshot", name: "스냅샷", domain: "snapshot.box", url: "https://snapshot.box",
    district: "join",
    action: "보유 코인으로 투표하기",
    desc: "프로젝트의 의사결정에 토큰 보유자로서 투표. 가스비 없이 서명만 하면 됩니다.",
    coins: ["ETH", "WLD", "ARB", "UNI", "ENS", "AAVE", "OP"],
    minKRW: 0, difficulty: 2, minutes: 5,
    steps: ["지갑 연결", "참여 중인 프로젝트 검색", "안건 읽고 투표 서명"],
    reviews: [],
  },
  {
    id: "giveth", name: "기브스", domain: "giveth.io", url: "https://giveth.io",
    district: "join",
    action: "코인으로 기부하기",
    desc: "수수료 없이 공익 프로젝트에 직접 후원. 기부 내역이 온체인에 투명하게 남아요.",
    coins: ["ETH", "USDT", "USDC"],
    minKRW: 1000, difficulty: 2, minutes: 5,
    steps: ["프로젝트 선택", "금액 입력", "지갑에서 전송"],
    reviews: [],
  },
  {
    id: "farcaster", name: "파캐스터", domain: "farcaster.xyz", url: "https://farcaster.xyz",
    district: "join",
    action: "지갑으로 로그인하는 SNS",
    desc: "계정이 회사가 아닌 내 지갑에 속한 SNS. 팔로워를 다른 앱으로 그대로 가져갈 수 있어요.",
    coins: ["ETH", "USDC"],
    minKRW: 0, difficulty: 1, minutes: 5,
    steps: ["앱 설치", "계정 생성", "채널 팔로우"],
    reviews: [],
  },

  // ── 2026-09-19 추가분. 도메인 응답과 '받는 코인'은 공식 페이지에서 확인 (README 참고) ──

  // 출발지: 코인별 지갑
  {
    id: "trustwallet", name: "트러스트 월렛", domain: "trustwallet.com", url: "https://trustwallet.com",
    district: "start",
    action: "여러 코인을 한 지갑에 담기",
    desc: "비트코인부터 리플, 도지, 트론까지 체인이 다른 코인을 앱 하나로 보관해요. 코인마다 지갑을 따로 만들기 부담스러울 때 좋은 시작점.",
    coins: ["BTC", "ETH", "SOL", "XRP", "DOGE", "ADA", "TRX", "USDT", "USDC", "AVAX", "POL", "NEAR", "SUI", "XLM", "BCH", "SHIB", "PEPE", "DOT", "ATOM", "APT"],
    minKRW: 0, difficulty: 2, minutes: 10,
    steps: ["공식 사이트에서 앱 설치", "복구 문구 백업", "거래소에 출금 주소로 등록 후 소액 출금"],
    reviews: [],
  },
  {
    id: "ledger", name: "레저", domain: "ledger.com", url: "https://www.ledger.com",
    district: "start",
    action: "큰 금액은 하드웨어 지갑에",
    desc: "개인 키를 인터넷과 분리된 기기에 보관해요. 금액이 커졌다면 가장 확실한 안전장치. 반드시 공식 사이트에서 새 제품으로 사야 합니다.",
    coins: ["BTC", "ETH", "SOL", "XRP", "DOGE", "ADA", "TRX", "USDT", "USDC", "AVAX", "POL", "LINK", "XLM", "BCH", "DOT", "ATOM", "HBAR", "APT", "STX"],
    minKRW: 120000, difficulty: 2, minutes: 30,
    steps: ["공식 사이트에서 기기 구매", "기기에서 직접 복구 문구 생성", "소액으로 입출금 테스트 후 옮기기"],
    reviews: [],
  },
  {
    id: "revoke", name: "리보크 캐시", domain: "revoke.cash", url: "https://revoke.cash",
    district: "start",
    action: "내 지갑 권한 점검하기",
    desc: "예전에 서명해 준 '내 토큰을 써도 좋다'는 허락을 한눈에 보고 끊어요. 피싱 피해의 상당수가 이 허락에서 시작됩니다. 조회는 무료.",
    coins: ["ETH", "ARB", "POL", "AVAX", "OP"],
    minKRW: 0, difficulty: 2, minutes: 5,
    steps: ["지갑 주소 입력 또는 연결", "모르는 서비스에 준 허락 확인", "필요 없는 허락 Revoke (가스비 소액)"],
    reviews: [r("revoke-1", "두번당한사람", "3년 전에 준 무제한 승인이 아직 살아있었어요. 다들 한 번씩 보세요.", { costKRW: 300, minutes: 5 })],
  },
  {
    id: "xaman", name: "자만", domain: "xaman.app", url: "https://xaman.app",
    district: "start",
    action: "리플(XRP) 지갑 만들기",
    desc: "XRP 레저 전용 지갑. 거래소 밖에서 XRP를 쓰려면 여기서 시작해요. 계정을 활성화하려면 소량의 XRP가 예치금으로 묶입니다.",
    coins: ["XRP"],
    minKRW: 5000, difficulty: 2, minutes: 10,
    steps: ["앱 설치 후 계정 생성", "비밀 번호(복구 키) 백업", "거래소에서 XRP 출금 — 데스티네이션 태그 확인"],
    reviews: [],
  },
  {
    id: "tronlink", name: "트론링크", domain: "tronlink.org", url: "https://www.tronlink.org",
    district: "start",
    action: "트론 지갑 만들기",
    desc: "TRX와 트론 기반 USDT를 담는 지갑. 트론은 USDT 송금 수수료가 싸서 해외 송금·결제에 많이 쓰여요.",
    coins: ["TRX", "USDT"],
    minKRW: 0, difficulty: 2, minutes: 10,
    steps: ["앱/확장 설치", "복구 문구 백업", "거래소에서 TRX 소액 출금"],
    reviews: [],
  },
  {
    id: "slush", name: "슬러시", domain: "slush.app", url: "https://slush.app",
    district: "start",
    action: "수이 지갑 만들고 스테이킹",
    desc: "수이(SUI) 공식 계열 지갑. 지갑 안에서 바로 검증인에게 맡겨 보상을 받을 수 있어요.",
    coins: ["SUI", "USDC"],
    minKRW: 2000, difficulty: 2, minutes: 10,
    steps: ["앱 설치 후 지갑 생성", "거래소에서 SUI 출금", "Stake 메뉴에서 검증인 선택"],
    reviews: [],
  },
  {
    id: "core", name: "코어", domain: "core.app", url: "https://core.app",
    district: "start",
    action: "아발란체 지갑 만들기",
    desc: "아발란체 재단 계열의 공식 지갑. 직접 위임 스테이킹도 되지만 최소 25 AVAX가 필요해서, 소액이면 '벤키'의 유동 스테이킹이 현실적이에요.",
    coins: ["AVAX", "USDC"],
    minKRW: 0, difficulty: 2, minutes: 10,
    steps: ["앱/확장 설치", "복구 문구 백업", "거래소에서 AVAX C-체인으로 출금"],
    reviews: [],
  },
  {
    id: "lobstr", name: "랍스터", domain: "lobstr.co", url: "https://lobstr.co",
    district: "start",
    action: "스텔라루멘 지갑 만들기",
    desc: "스텔라(XLM) 네트워크의 대표 지갑. 수수료가 사실상 0원이라 소액 송금 체험에 좋아요. 솔직히 XLM으로 할 수 있는 일은 아직 송금·결제 위주입니다.",
    coins: ["XLM", "USDC"],
    minKRW: 1000, difficulty: 1, minutes: 10,
    steps: ["앱 설치 후 계정 생성", "거래소에서 XLM 출금 — 메모 확인", "친구에게 소액 보내보기"],
    reviews: [],
  },
  {
    id: "mydoge", name: "마이도지", domain: "mydoge.com", url: "https://www.mydoge.com",
    district: "start",
    action: "도지 지갑 만들고 팁 보내기",
    desc: "도지코인 전용 지갑. 도지는 원래 '인터넷 팁'으로 시작한 코인이에요. 소액을 가볍게 주고받는 데 씁니다.",
    coins: ["DOGE"],
    minKRW: 1000, difficulty: 1, minutes: 10,
    steps: ["앱 설치 후 지갑 생성", "거래소에서 DOGE 출금", "친구 주소로 소액 팁 보내기"],
    reviews: [],
  },

  // 환승역
  {
    id: "optimism", name: "옵티미즘", domain: "optimism.io", url: "https://www.optimism.io",
    district: "transit",
    action: "수수료 싼 L2로 옮기기",
    desc: "베이스와 같은 기술(OP 스택)의 원조 L2. 수수료가 몇십 원 수준이에요.",
    coins: ["ETH", "USDC", "USDT", "OP"],
    minKRW: 10000, difficulty: 2, minutes: 10,
    steps: ["지갑에 OP Mainnet 추가", "브릿지로 ETH 이동", "옵티미즘 위 서비스 이용"],
    reviews: [],
  },
  {
    id: "across", name: "어크로스", domain: "across.to", url: "https://across.to",
    district: "transit",
    action: "L2끼리 빠르게 갈아타기",
    desc: "베이스 ↔ 아비트럼 ↔ 옵티미즘 사이를 1분 안에 옮겨주는 브릿지. 공식 브릿지보다 빠른 대신 소액의 수수료가 붙어요.",
    coins: ["ETH", "USDC", "USDT"],
    minKRW: 5000, difficulty: 2, minutes: 3,
    steps: ["지갑 연결", "출발·도착 네트워크 선택", "금액 입력 후 서명"],
    reviews: [],
  },
  {
    id: "phoenix", name: "피닉스", domain: "phoenix.acinq.co", url: "https://phoenix.acinq.co",
    district: "transit",
    action: "비트코인 고속도로(라이트닝) 타기",
    desc: "비트코인을 1초 만에, 몇 원의 수수료로 보내는 라이트닝 지갑. 내 키를 내가 갖는 방식이에요. 매장 결제와 팁에 쓰는 비트코인은 거의 다 라이트닝입니다.",
    coins: ["BTC"],
    minKRW: 10000, difficulty: 2, minutes: 10,
    steps: ["앱 설치 후 복구 문구 백업", "비트코인을 받아 채널 열기 (첫 입금 시 수수료)", "QR로 결제·송금"],
    reviews: [],
  },

  // 돈 굴리기
  {
    id: "rocketpool", name: "로켓풀", domain: "rocketpool.net", url: "https://rocketpool.net",
    district: "earn",
    action: "ETH 분산 스테이킹",
    desc: "리도와 같은 유동 스테이킹이지만 운영자가 더 분산돼 있어요. ETH를 맡기면 rETH를 받습니다.",
    coins: ["ETH"],
    minKRW: 10000, difficulty: 2, minutes: 5,
    steps: ["지갑 연결", "맡길 ETH 입력", "rETH 수령"],
    reviews: [],
  },
  {
    id: "marinade", name: "마리네이드", domain: "marinade.finance", url: "https://marinade.finance",
    district: "earn",
    action: "SOL 맡기고 이자 받기",
    desc: "솔라나의 오래된 유동 스테이킹. 여러 검증인에게 자동으로 나눠 맡겨줘요.",
    coins: ["SOL"],
    minKRW: 5000, difficulty: 2, minutes: 5,
    steps: ["팬텀 지갑 연결", "SOL 수량 입력", "mSOL 수령"],
    reviews: [],
  },
  {
    id: "jupiter", name: "주피터", domain: "jup.ag", url: "https://jup.ag",
    district: "swap",
    action: "솔라나에서 코인 바꾸기",
    desc: "솔라나판 유니스왑. 여러 거래소 가격을 비교해 가장 좋은 경로로 바꿔줘요. 수수료는 몇 원.",
    coins: ["SOL", "USDC", "USDT", "JUP"],
    minKRW: 3000, difficulty: 2, minutes: 3,
    steps: ["팬텀 지갑 연결", "바꿀 코인 선택", "예상 수량 확인 후 서명"],
    reviews: [],
  },
  {
    id: "lace", name: "레이스", domain: "lace.io", url: "https://www.lace.io",
    district: "earn",
    action: "에이다 맡기고 이자 받기",
    desc: "카르다노 개발사가 만든 지갑. ADA는 지갑에서 바로 스테이킹되고, 묶이는 기간 없이 언제든 뺄 수 있어요. 에이다 홀더가 가장 먼저 해볼 만한 것.",
    coins: ["ADA"],
    minKRW: 5000, difficulty: 2, minutes: 15,
    steps: ["지갑 설치 후 복구 문구 백업", "거래소에서 ADA 출금", "스테이킹 메뉴에서 풀 선택 (예치금 2 ADA)"],
    reviews: [],
  },
  {
    id: "mynearwallet", name: "마이니어월렛", domain: "mynearwallet.com", url: "https://app.mynearwallet.com",
    district: "earn",
    action: "NEAR 맡기고 이자 받기",
    desc: "니어 지갑에서 바로 검증인에게 위임해요. 뺄 때는 이틀쯤 기다려야 합니다.",
    coins: ["NEAR"],
    minKRW: 5000, difficulty: 2, minutes: 15,
    steps: ["지갑 생성 후 복구 문구 백업", "거래소에서 NEAR 출금", "Staking에서 검증인 선택"],
    reviews: [],
  },
  {
    id: "benqi", name: "벤키", domain: "benqi.fi", url: "https://benqi.fi",
    district: "earn",
    action: "소액 AVAX 스테이킹",
    desc: "직접 위임은 최소 25 AVAX가 필요하지만, 여기선 소액도 맡기고 sAVAX를 받아요. 뺄 때 대기 기간이 있습니다.",
    coins: ["AVAX"],
    minKRW: 10000, difficulty: 2, minutes: 5,
    steps: ["코어 지갑 연결", "Liquid Staking에서 수량 입력", "sAVAX 수령"],
    reviews: [],
  },
  {
    id: "justlend", name: "저스트렌드", domain: "justlend.org", url: "https://justlend.org",
    district: "earn",
    action: "TRX 스테이킹·예치",
    desc: "트론의 대표 예치 서비스. TRX를 스테이킹하거나 USDT를 맡겨 이자를 받아요.",
    coins: ["TRX", "USDT"],
    minKRW: 5000, difficulty: 3, minutes: 10,
    steps: ["트론링크 연결", "Stake 또는 Supply 선택", "수량 입력 후 서명"],
    reviews: [],
  },
  {
    id: "linkstaking", name: "체인링크 스테이킹", domain: "staking.chain.link", url: "https://staking.chain.link",
    district: "earn",
    action: "LINK 스테이킹 (자리 날 때만)",
    desc: "솔직히 말하면 지금은 풀이 가득 차 있어요. 기존 참여자가 빠져 자리가 날 때만 들어갈 수 있습니다. LINK는 개인이 직접 쓸 곳이 많지 않은 코인이에요.",
    coins: ["LINK"],
    minKRW: 20000, difficulty: 3, minutes: 10,
    steps: ["지갑 연결", "풀에 빈자리가 있는지 확인", "있으면 수량 입력 후 스테이킹"],
    reviews: [],
  },
  {
    id: "polstaking", name: "폴리곤 스테이킹", domain: "staking.polygon.technology", url: "https://staking.polygon.technology",
    district: "earn",
    action: "POL 맡기고 이자 받기",
    desc: "폴리곤 공식 스테이킹. 이더리움 메인넷에서 진행돼서 가스비가 몇천 원 들 수 있어요. 소액이면 배보다 배꼽이 클 수 있습니다.",
    coins: ["POL"],
    minKRW: 30000, difficulty: 3, minutes: 10,
    steps: ["메타마스크 연결 (이더리움 메인넷)", "검증인 선택", "POL 위임 — 가스비용 ETH 필요"],
    reviews: [],
  },

  // 결제·쇼핑
  {
    id: "coingate", name: "코인게이트", domain: "coingate.com", url: "https://coingate.com",
    district: "pay",
    action: "리플·도지로 기프트카드 사기",
    desc: "비트리필이 받지 않는 XRP도 받는 기프트카드 몰. 리플·도지·트론 홀더가 '일단 뭐라도 사보기'에 가장 빠른 길이에요. 나라별로 살 수 있는 브랜드가 달라요.",
    coins: ["BTC", "ETH", "SOL", "XRP", "USDC", "DOGE", "TRX", "POL"],
    minKRW: 10000, difficulty: 1, minutes: 5,
    steps: ["기프트카드 선택", "결제 코인 선택", "지갑에서 주소/QR로 전송"],
    reviews: [],
  },
  {
    id: "mullvad", name: "물바드 VPN", domain: "mullvad.net", url: "https://mullvad.net",
    district: "pay",
    action: "비트코인으로 VPN 결제",
    desc: "이메일도 없이 계정 번호만으로 쓰는 VPN. 월 5유로 정액을 비트코인으로 내면 할인도 있어요. 코인 결제가 '진짜 쓸모 있는' 드문 사례.",
    coins: ["BTC", "BCH"],
    minKRW: 8000, difficulty: 1, minutes: 10,
    steps: ["계정 번호 생성", "결제 수단에서 Bitcoin 선택", "지갑에서 전송 후 확인 대기"],
    reviews: [],
  },
  {
    id: "proton", name: "프로톤", domain: "proton.me", url: "https://proton.me",
    district: "pay",
    action: "비트코인으로 메일·VPN 구독",
    desc: "보안 메일·VPN·클라우드 구독료를 비트코인으로 낼 수 있어요.",
    coins: ["BTC"],
    minKRW: 8000, difficulty: 1, minutes: 10,
    steps: ["무료 계정 생성", "유료 플랜에서 Bitcoin 결제 선택", "지갑에서 전송"],
    reviews: [],
  },
  {
    id: "namecheap", name: "네임칩", domain: "namecheap.com", url: "https://www.namecheap.com",
    district: "pay",
    action: "비트코인으로 도메인 사기",
    desc: "세계적인 도메인 등록 업체. 비트코인으로 잔액을 충전해 도메인과 호스팅을 살 수 있어요.",
    coins: ["BTC"],
    minKRW: 15000, difficulty: 1, minutes: 10,
    steps: ["원하는 도메인 검색", "계정 잔액을 Bitcoin으로 충전", "잔액으로 결제"],
    reviews: [],
  },

  // 수집·티켓
  {
    id: "magiceden", name: "매직에덴", domain: "magiceden.io", url: "https://magiceden.io",
    district: "collect",
    action: "솔라나·비트코인 NFT 거래",
    desc: "솔라나와 비트코인(오디널스) NFT의 대표 마켓.",
    coins: ["SOL", "BTC", "ETH"],
    minKRW: 5000, difficulty: 2, minutes: 10,
    steps: ["팬텀 지갑 연결", "컬렉션 탐색", "구매 서명"],
    reviews: [],
  },
  {
    id: "drip", name: "드립", domain: "drip.haus", url: "https://drip.haus",
    district: "collect",
    action: "무료 디지털 수집품 받기",
    desc: "창작자를 구독하면 작품이 지갑으로 무료 배달돼요. 돈 한 푼 안 들이고 'NFT를 받아본다'는 경험을 할 수 있는 곳.",
    coins: ["SOL"],
    minKRW: 0, difficulty: 1, minutes: 5,
    steps: ["팬텀 지갑 연결", "마음에 드는 창작자 구독", "지갑에서 받은 작품 확인"],
    reviews: [],
  },
  {
    id: "xrpcafe", name: "XRP 카페", domain: "xrp.cafe", url: "https://xrp.cafe",
    district: "collect",
    action: "리플로 NFT 사보기",
    desc: "XRP 레저 위의 NFT 마켓. 리플로 할 수 있는 몇 안 되는 '결제 아닌' 활동이에요.",
    coins: ["XRP"],
    minKRW: 3000, difficulty: 2, minutes: 10,
    steps: ["자만 지갑으로 로그인", "컬렉션 탐색", "자만 앱에서 서명해 구매"],
    reviews: [],
  },
  {
    id: "paragraph", name: "패러그래프", domain: "paragraph.com", url: "https://paragraph.com",
    district: "collect",
    action: "좋은 글 수집하고 후원하기",
    desc: "web3판 뉴스레터. 마음에 드는 글을 소액으로 수집하면 그 돈이 작가에게 가요.",
    coins: ["ETH"],
    minKRW: 1000, difficulty: 2, minutes: 5,
    steps: ["지갑 연결", "글 읽고 Collect", "서명"],
    reviews: [],
  },

  // 신원·이름
  {
    id: "sns", name: "솔라나 네임 서비스", domain: "sns.id", url: "https://www.sns.id",
    district: "identity",
    action: "내이름.sol 주소 만들기",
    desc: "솔라나판 ENS. 한 번 사면 갱신료가 없어요.",
    coins: ["SOL", "USDC"],
    minKRW: 30000, difficulty: 2, minutes: 5,
    steps: ["원하는 이름 검색", "팬텀 지갑으로 결제", "내 주소에 연결"],
    reviews: [],
  },
  {
    id: "suins", name: "수이 네임 서비스", domain: "suins.io", url: "https://suins.io",
    district: "identity",
    action: "내이름.sui 주소 만들기",
    desc: "수이 네트워크의 이름 주소. 긴 0x 주소 대신 이름으로 송금받아요.",
    coins: ["SUI", "USDC"],
    minKRW: 15000, difficulty: 2, minutes: 5,
    steps: ["이름 검색", "슬러시 지갑으로 결제", "기본 주소로 설정"],
    reviews: [],
  },

  // 참여·후원
  {
    id: "tally", name: "탤리", domain: "tally.xyz", url: "https://www.tally.xyz",
    district: "join",
    action: "ARB·UNI로 거버넌스 투표",
    desc: "아비트럼·유니스왑 같은 프로젝트의 온체인 투표소. ARB와 UNI는 원래 '투표권'으로 만들어진 코인이에요. 직접 투표하거나 대표자에게 위임할 수 있습니다.",
    coins: ["ARB", "UNI", "ENS"],
    minKRW: 1000, difficulty: 2, minutes: 10,
    steps: ["지갑 연결", "보유 토큰의 DAO 찾기", "대표자에게 위임하거나 직접 투표"],
    reviews: [],
  },
  {
    id: "givingblock", name: "더 기빙 블록", domain: "thegivingblock.com", url: "https://thegivingblock.com",
    district: "join",
    action: "코인으로 비영리단체 기부",
    desc: "세이브더칠드런 등 수천 개 비영리단체에 코인으로 기부하는 플랫폼. 미국 단체 중심이라 국내 기부금 영수증은 나오지 않아요.",
    coins: ["BTC", "ETH", "SOL", "USDT", "USDC", "DOGE", "AVAX", "POL", "BAT", "UNI", "LINK", "BCH", "SHIB", "PEPE", "DOT", "ENS", "AAVE", "OP", "JUP", "SAND"],
    minKRW: 5000, difficulty: 1, minutes: 5,
    steps: ["단체 선택", "기부할 코인 선택", "표시된 주소로 전송"],
    reviews: [],
  },
  {
    id: "gitcoin", name: "깃코인", domain: "gitcoin.co", url: "https://gitcoin.co",
    district: "join",
    action: "오픈소스 프로젝트 후원",
    desc: "소액 후원이 많을수록 매칭 기금이 더 크게 붙는 방식. 천 원이 몇만 원의 효과를 내기도 해요. 라운드가 열릴 때만 참여할 수 있습니다.",
    coins: ["ETH", "USDC"],
    minKRW: 1500, difficulty: 2, minutes: 10,
    steps: ["진행 중인 라운드 확인", "프로젝트를 장바구니에 담기", "L2에서 한 번에 결제"],
    reviews: [],
  },
  {
    id: "primal", name: "프라이멀", domain: "primal.net", url: "https://primal.net",
    district: "join",
    action: "비트코인 팁 주고받는 SNS",
    desc: "'좋아요' 대신 비트코인 몇 원을 보내는(zap) 탈중앙 SNS. 라이트닝 지갑이 내장돼 있어요.",
    coins: ["BTC"],
    minKRW: 1000, difficulty: 1, minutes: 5,
    steps: ["앱 설치 후 계정 생성", "내장 지갑에 소액 입금", "마음에 드는 글에 zap"],
    reviews: [],
  },
  {
    id: "brave", name: "브레이브", domain: "brave.com", url: "https://brave.com",
    district: "join",
    action: "BAT로 크리에이터 후원",
    desc: "광고를 막고, 본 광고만큼 BAT를 돌려주는 브라우저. 다만 한국은 BAT 적립·출금 지원 지역이 아니라는 이용자 보고가 있어요. 이미 가진 BAT로 후원하는 용도 위주입니다.",
    coins: ["BAT"],
    minKRW: 0, difficulty: 1, minutes: 5,
    steps: ["브라우저 설치", "Brave Rewards 설정 확인", "지원 지역이면 광고 보상 켜기 / 크리에이터 후원"],
    reviews: [],
  },
  {
    id: "layer3", name: "레이어3", domain: "layer3.xyz", url: "https://layer3.xyz",
    district: "join",
    action: "퀘스트로 web3 배우기",
    desc: "'스왑 해보기', '브릿지 해보기' 같은 미션을 따라 하면 경험치와 보상을 줘요. 뭘 해야 할지 모를 때 좋은 연습장.",
    coins: ["ETH"],
    minKRW: 2000, difficulty: 1, minutes: 15,
    steps: ["지갑 연결", "입문 퀘스트 선택", "안내대로 온체인 미션 완료"],
    reviews: [],
  },

  // ── 2026-09-19 2차 추가분 ──

  // 출발지
  {
    id: "coinone", name: "코인원", domain: "coinone.co.kr", url: "https://coinone.co.kr",
    district: "start",
    action: "원화로 코인 사기",
    desc: "국내 원화 거래소 중 하나. 거래소마다 상장 코인과 출금 가능한 지갑이 조금씩 달라요.",
    coins: ALL_COINS,
    minKRW: 5000, difficulty: 1, minutes: 10,
    steps: ["은행 계좌 연결", "원화 입금", "코인 매수"],
    reviews: [],
  },
  {
    id: "digitalx", name: "디지털엑스 (옛 코빗)", domain: "digitalx.miraeasset.com", url: "https://digitalx.miraeasset.com",
    district: "start",
    action: "원화로 코인 사기",
    desc: "국내 첫 거래소 코빗이 미래에셋에 인수되면서 2026년 9월 이름과 주소를 바꿨어요. 예전 korbit.co.kr로 들어가면 이 주소로 넘어옵니다.",
    coins: ALL_COINS,
    minKRW: 5000, difficulty: 1, minutes: 10,
    steps: ["은행 계좌 연결", "원화 입금", "코인 매수"],
    reviews: [],
  },
  {
    id: "rabby", name: "래비", domain: "rabby.io", url: "https://rabby.io",
    district: "start",
    action: "서명 전에 위험을 알려주는 지갑",
    desc: "서명하기 전에 '이 거래로 무엇이 빠져나가는지'를 미리 보여주는 이더리움 계열 지갑. 메타마스크에서 그대로 옮겨올 수 있어요.",
    coins: ["ETH", "USDT", "USDC", "ARB", "OP", "POL", "AVAX", "UNI", "LINK", "AAVE", "ENS", "SHIB", "PEPE", "BAT", "SAND"],
    minKRW: 0, difficulty: 2, minutes: 10,
    steps: ["공식 사이트에서 확장 설치", "새 지갑 생성 또는 기존 지갑 가져오기", "서명 전 미리보기 확인하는 습관 들이기"],
    reviews: [],
  },
  {
    id: "keplr", name: "케플러", domain: "keplr.app", url: "https://www.keplr.app",
    district: "start",
    action: "코스모스 지갑 만들고 스테이킹",
    desc: "ATOM을 비롯한 코스모스 계열의 기본 지갑. 지갑 안에서 바로 검증인에게 맡길 수 있어요. 뺄 때는 21일을 기다려야 합니다.",
    coins: ["ATOM"],
    minKRW: 5000, difficulty: 2, minutes: 15,
    steps: ["앱/확장 설치 후 복구 문구 백업", "거래소에서 ATOM 출금 — 메모 확인", "Stake에서 검증인 선택"],
    reviews: [],
  },
  {
    id: "petra", name: "페트라", domain: "petra.app", url: "https://petra.app",
    district: "start",
    action: "앱토스 지갑 만들기",
    desc: "앱토스 개발사가 만든 공식 지갑. 직접 위임 스테이킹은 최소 수량이 있어서, 소액이면 '암니스'의 유동 스테이킹이 현실적이에요.",
    coins: ["APT", "USDC", "USDT"],
    minKRW: 0, difficulty: 2, minutes: 10,
    steps: ["앱/확장 설치", "복구 문구 백업", "거래소에서 APT 소액 출금"],
    reviews: [],
  },
  {
    id: "hashpack", name: "해시팩", domain: "hashpack.app", url: "https://www.hashpack.app",
    district: "start",
    action: "헤데라 지갑 만들고 스테이킹",
    desc: "HBAR의 대표 지갑. 지갑에서 노드를 고르기만 하면 스테이킹이 되고, 묶이는 기간이 없어요.",
    coins: ["HBAR", "USDC"],
    minKRW: 1000, difficulty: 2, minutes: 10,
    steps: ["앱 설치 후 계정 생성", "거래소에서 HBAR 출금 — 메모 확인", "Stake 메뉴에서 노드 선택"],
    reviews: [],
  },
  {
    id: "leather", name: "레더", domain: "leather.io", url: "https://leather.io",
    district: "start",
    action: "스택스·비트코인 지갑 만들기",
    desc: "비트코인과, 비트코인 위에 올라간 스택스(STX)를 함께 담는 지갑.",
    coins: ["STX", "BTC"],
    minKRW: 0, difficulty: 2, minutes: 10,
    steps: ["확장/앱 설치", "복구 문구 백업", "거래소에서 STX 소액 출금"],
    reviews: [],
  },
  {
    id: "novawallet", name: "노바 월렛", domain: "novawallet.io", url: "https://novawallet.io",
    district: "start",
    action: "폴카닷 지갑 만들고 스테이킹",
    desc: "폴카닷(DOT) 생태계 전용 모바일 지갑. 소액도 '풀 스테이킹'으로 맡길 수 있어요.",
    coins: ["DOT"],
    minKRW: 3000, difficulty: 2, minutes: 15,
    steps: ["앱 설치 후 복구 문구 백업", "거래소에서 DOT 출금", "Staking에서 풀 참여 선택"],
    reviews: [],
  },
  {
    id: "bitcoincom", name: "비트코인닷컴 월렛", domain: "bitcoin.com", url: "https://www.bitcoin.com/wallet/",
    district: "start",
    action: "비트코인캐시 지갑 만들기",
    desc: "BCH를 중심으로 BTC·ETH도 담는 지갑. 비트코인캐시는 수수료가 1원 안팎이라 소액 결제용으로 만들어진 코인이에요.",
    coins: ["BCH", "BTC", "ETH"],
    minKRW: 0, difficulty: 1, minutes: 10,
    steps: ["앱 설치", "복구 문구 백업", "거래소에서 BCH 소액 출금"],
    reviews: [],
  },

  // 환승역
  {
    id: "jumper", name: "점퍼", domain: "jumper.xyz", url: "https://jumper.xyz",
    district: "transit",
    action: "체인 사이 어디든 옮기기",
    desc: "이더리움 계열과 솔라나까지, 여러 브릿지 중 가장 좋은 경로를 찾아주는 길찾기 서비스. 예전 주소 jumper.exchange에서 이전했어요.",
    coins: ["ETH", "SOL", "USDC", "USDT", "ARB", "OP", "POL", "AVAX"],
    minKRW: 5000, difficulty: 2, minutes: 5,
    steps: ["지갑 연결", "출발·도착 체인과 코인 선택", "경로 비교 후 서명"],
    reviews: [],
  },
  {
    id: "superbridge", name: "슈퍼브릿지", domain: "superbridge.app", url: "https://superbridge.app",
    district: "transit",
    action: "공식 브릿지를 한곳에서",
    desc: "베이스·옵티미즘 같은 L2의 공식 브릿지를 모아둔 화면. 가장 안전한 길이지만 메인넷으로 돌아올 때는 7일이 걸릴 수 있어요.",
    coins: ["ETH", "USDC", "OP"],
    minKRW: 10000, difficulty: 2, minutes: 10,
    steps: ["지갑 연결", "도착 네트워크 선택", "금액 입력 후 서명"],
    reviews: [],
  },
  {
    id: "polygonportal", name: "폴리곤 포털", domain: "portal.polygon.technology", url: "https://portal.polygon.technology",
    district: "transit",
    action: "폴리곤으로 옮기기",
    desc: "폴리곤 공식 브릿지. 폴리곤은 수수료가 몇 원 수준이라 USDC 결제에 많이 쓰여요.",
    coins: ["POL", "ETH", "USDC", "USDT"],
    minKRW: 10000, difficulty: 2, minutes: 15,
    steps: ["메타마스크 연결", "Bridge에서 코인과 금액 선택", "서명 후 도착 대기"],
    reviews: [],
  },

  // 돈 굴리기
  {
    id: "etherfi", name: "이더파이", domain: "ether.fi", url: "https://www.ether.fi",
    district: "earn",
    action: "ETH 리스테이킹",
    desc: "ETH를 맡기면 스테이킹 보상에 추가 보상을 얹어주는 서비스. 구조가 한 겹 더 복잡한 만큼 위험도 한 겹 더 있어요.",
    coins: ["ETH"],
    minKRW: 10000, difficulty: 3, minutes: 5,
    steps: ["지갑 연결", "ETH 수량 입력", "eETH 수령"],
    reviews: [],
  },
  {
    id: "compound", name: "컴파운드", domain: "compound.finance", url: "https://compound.finance",
    district: "earn",
    action: "달러 코인 예치하고 이자 받기",
    desc: "에이브와 함께 가장 오래된 예치·대출 서비스. 구조가 단순해서 처음 예치해보기에 무난해요.",
    coins: ["USDC", "USDT", "ETH"],
    minKRW: 10000, difficulty: 3, minutes: 10,
    steps: ["지갑 연결", "네트워크와 시장 선택", "승인 + 예치 서명"],
    reviews: [],
  },
  {
    id: "kamino", name: "카미노", domain: "kamino.com", url: "https://kamino.com",
    district: "earn",
    action: "솔라나에서 예치 이자 받기",
    desc: "솔라나의 대표 예치 서비스. 수수료가 몇 원이라 소액으로 시험해보기 좋아요.",
    coins: ["SOL", "USDC", "USDT"],
    minKRW: 5000, difficulty: 3, minutes: 5,
    steps: ["팬텀 지갑 연결", "Lend에서 자산 선택", "수량 입력 후 서명"],
    reviews: [],
  },
  {
    id: "osmosis", name: "오스모시스", domain: "osmosis.zone", url: "https://osmosis.zone",
    district: "swap",
    action: "코스모스 코인 바꾸기",
    desc: "코스모스 생태계의 탈중앙 거래소. ATOM을 다른 코스모스 계열 코인으로 바꿀 수 있어요.",
    coins: ["ATOM", "USDC"],
    minKRW: 3000, difficulty: 2, minutes: 5,
    steps: ["케플러 지갑 연결", "ATOM 입금(Deposit)", "바꿀 코인 선택 후 서명"],
    reviews: [],
  },
  {
    id: "stackingdao", name: "스태킹 다오", domain: "stackingdao.com", url: "https://www.stackingdao.com",
    district: "earn",
    action: "STX 맡기고 보상 받기",
    desc: "스택스의 '스태킹'을 소액으로 대신 해주는 서비스. STX를 맡기면 stSTX를 받아요.",
    coins: ["STX"],
    minKRW: 5000, difficulty: 2, minutes: 5,
    steps: ["레더 지갑 연결", "STX 수량 입력", "stSTX 수령"],
    reviews: [],
  },
  {
    id: "polkadotstaking", name: "폴카닷 스테이킹", domain: "staking.polkadot.cloud", url: "https://staking.polkadot.cloud",
    district: "earn",
    action: "DOT 풀에 맡기고 이자 받기",
    desc: "폴카닷 공식 스테이킹 대시보드. 소액은 '풀(Pool)'에 참여하면 돼요. 뺄 때는 28일을 기다려야 합니다.",
    coins: ["DOT"],
    minKRW: 3000, difficulty: 2, minutes: 10,
    steps: ["지갑 연결", "Pools에서 풀 선택", "수량 입력 후 서명"],
    reviews: [],
  },
  {
    id: "amnis", name: "암니스", domain: "amnis.finance", url: "https://amnis.finance",
    district: "earn",
    action: "소액 APT 스테이킹",
    desc: "앱토스의 유동 스테이킹. 직접 위임의 최소 수량 없이 소액도 맡길 수 있어요.",
    coins: ["APT"],
    minKRW: 5000, difficulty: 2, minutes: 5,
    steps: ["페트라 지갑 연결", "APT 수량 입력", "stAPT 수령"],
    reviews: [],
  },

  // 결제·쇼핑
  {
    id: "njalla", name: "냘라", domain: "njal.la", url: "https://njal.la",
    district: "pay",
    action: "코인으로 익명 도메인·서버",
    desc: "개인정보 없이 도메인과 서버를 빌리는 프라이버시 업체. 코인 결제가 기본이에요.",
    coins: ["BTC"],
    minKRW: 25000, difficulty: 2, minutes: 15,
    steps: ["계정 생성", "지갑(잔액)을 코인으로 충전", "도메인·서버 주문"],
    reviews: [],
  },
  {
    id: "silentlink", name: "사일런트링크", domain: "silent.link", url: "https://silent.link",
    district: "pay",
    action: "비트코인으로 여행용 eSIM",
    desc: "가입 절차 없이 비트코인(라이트닝)으로 사는 해외 데이터 eSIM. 여행 갈 때 코인을 써볼 수 있는 실용적인 사례.",
    coins: ["BTC"],
    minKRW: 15000, difficulty: 2, minutes: 10,
    steps: ["요금제 선택", "라이트닝 또는 온체인으로 결제", "QR로 eSIM 설치"],
    reviews: [],
  },

  // 수집·티켓
  {
    id: "tensor", name: "텐서", domain: "tensor.trade", url: "https://www.tensor.trade",
    district: "collect",
    action: "솔라나 NFT 거래",
    desc: "거래량 기준 솔라나 최대급 NFT 마켓. 매직에덴보다 트레이더 성향이 강해요.",
    coins: ["SOL"],
    minKRW: 5000, difficulty: 2, minutes: 10,
    steps: ["팬텀 지갑 연결", "컬렉션 탐색", "구매 서명"],
    reviews: [],
  },
  {
    id: "gamma", name: "감마", domain: "gamma.io", url: "https://gamma.io",
    district: "collect",
    action: "비트코인·스택스 NFT 수집",
    desc: "비트코인 오디널스와 스택스 NFT를 다루는 마켓.",
    coins: ["STX", "BTC"],
    minKRW: 5000, difficulty: 2, minutes: 10,
    steps: ["레더 지갑 연결", "컬렉션 탐색", "구매 서명"],
    reviews: [],
  },
  {
    id: "sandbox", name: "더 샌드박스", domain: "sandbox.game", url: "https://www.sandbox.game",
    district: "collect",
    action: "메타버스 아이템·땅 사보기",
    desc: "SAND는 이 게임 세계의 화폐예요. 아바타 아이템과 땅을 사고, 보유량에 따라 스테이킹도 돼요. 이용자가 예전만큼 많지는 않습니다.",
    coins: ["SAND", "ETH"],
    minKRW: 3000, difficulty: 2, minutes: 15,
    steps: ["계정 생성 후 지갑 연결", "마켓에서 아이템 탐색", "SAND로 구매"],
    reviews: [],
  },

  // 신원·이름
  {
    id: "aptosnames", name: "앱토스 네임", domain: "aptosnames.com", url: "https://www.aptosnames.com",
    district: "identity",
    action: "내이름.apt 주소 만들기",
    desc: "앱토스 네트워크의 이름 주소.",
    coins: ["APT"],
    minKRW: 3000, difficulty: 2, minutes: 5,
    steps: ["이름 검색", "페트라 지갑으로 결제", "기본 이름으로 설정"],
    reviews: [],
  },
  {
    id: "humanpassport", name: "휴먼 패스포트", domain: "passport.human.tech", url: "https://passport.human.tech",
    district: "identity",
    action: "'봇이 아님' 점수 쌓기",
    desc: "옛 깃코인 패스포트. 여러 인증을 모아 '진짜 사람' 점수를 만들어요. 깃코인 후원이나 에어드롭에서 이 점수를 요구하기도 합니다. 무료.",
    coins: ["ETH"],
    minKRW: 0, difficulty: 1, minutes: 10,
    steps: ["지갑 연결", "구글·깃허브·ENS 등 인증 추가", "점수 확인"],
    reviews: [],
  },

  // 참여·후원
  {
    id: "opvote", name: "옵티미즘 거버넌스", domain: "vote.optimism.io", url: "https://vote.optimism.io",
    district: "join",
    action: "OP로 투표하거나 위임하기",
    desc: "OP는 옵티미즘의 투표권이에요. 직접 투표가 부담스러우면 믿을 만한 대표자에게 위임하면 됩니다. 위임은 코인이 빠져나가지 않아요.",
    coins: ["OP"],
    minKRW: 500, difficulty: 2, minutes: 5,
    steps: ["지갑 연결 (OP Mainnet)", "대표자(Delegate) 살펴보기", "위임 서명"],
    reviews: [],
  },
  {
    id: "jupvote", name: "주피터 거버넌스", domain: "vote.jup.ag", url: "https://vote.jup.ag",
    district: "join",
    action: "JUP 맡기고 투표하기",
    desc: "JUP을 스테이킹하면 주피터의 안건에 투표할 수 있고, 참여자에게 보상이 나눠지기도 해요. 뺄 때 30일이 걸립니다.",
    coins: ["JUP"],
    minKRW: 3000, difficulty: 2, minutes: 5,
    steps: ["팬텀 지갑 연결", "JUP 스테이킹", "진행 중인 안건에 투표"],
    reviews: [],
  },
  {
    id: "tor", name: "토르 프로젝트", domain: "torproject.org", url: "https://donate.torproject.org/cryptocurrency/",
    district: "join",
    action: "온라인 프라이버시 단체 후원",
    desc: "익명 브라우저 토르를 만드는 비영리단체. 스텔라루멘과 도지를 직접 받는 드문 곳이에요.",
    coins: ["BTC", "ETH", "DOGE", "XLM"],
    minKRW: 3000, difficulty: 1, minutes: 5,
    steps: ["후원 페이지에서 코인 선택", "표시된 주소 확인", "지갑에서 전송"],
    reviews: [],
  },
  {
    id: "internetarchive", name: "인터넷 아카이브", domain: "archive.org", url: "https://archive.org/donate/cryptocurrency",
    district: "join",
    action: "인터넷 도서관 후원",
    desc: "웹페이지와 책을 보존하는 비영리 디지털 도서관. 리플(XRP)을 직접 받아요 — 데스티네이션 태그를 꼭 넣어야 합니다.",
    coins: ["BTC", "ETH", "XRP", "USDC", "USDT"],
    minKRW: 3000, difficulty: 1, minutes: 5,
    steps: ["후원 페이지에서 코인 선택", "주소와 태그 확인", "지갑에서 전송"],
    reviews: [],
  },
  {
    id: "galxe", name: "갤럭시", domain: "galxe.com", url: "https://www.galxe.com",
    district: "join",
    action: "프로젝트 이벤트·퀘스트 참여",
    desc: "여러 프로젝트가 여는 퀘스트 모음. 참여 기록이 배지로 남아요. 보상을 미끼로 한 가짜 링크가 많으니 반드시 여기서 출발하세요.",
    coins: ["ETH"],
    minKRW: 0, difficulty: 1, minutes: 10,
    steps: ["지갑 연결", "관심 프로젝트 퀘스트 선택", "미션 완료 후 배지 수령"],
    reviews: [],
  },
  {
    id: "juicebox", name: "주스박스", domain: "juicebox.money", url: "https://juicebox.money",
    district: "join",
    action: "코인 크라우드펀딩 참여",
    desc: "누구나 프로젝트를 열고 ETH로 모금하는 크라우드펀딩. 돈이 어디로 가는지 전부 공개돼요.",
    coins: ["ETH"],
    minKRW: 3000, difficulty: 2, minutes: 10,
    steps: ["프로젝트 탐색", "후원 금액 입력", "서명"],
    reviews: [],
  },

  // ── 2026-09-19 3차: 코인별 재검증에서 찾은 쓰임새. 도메인 응답 + 사이트 제목으로 정체 확인 ──

  // 코인 바꾸기 (체인별 대표 탈중앙 거래소)
  {
    id: "saucerswap", name: "소서스왑", domain: "saucerswap.finance", url: "https://www.saucerswap.finance",
    district: "swap",
    action: "헤데라에서 코인 바꾸기",
    desc: "헤데라의 대표 탈중앙 거래소. HBAR를 헤데라 생태계의 다른 토큰이나 USDC로 바꿀 수 있어요.",
    coins: ["HBAR", "USDC"],
    minKRW: 2000, difficulty: 2, minutes: 5,
    steps: ["해시팩 지갑 연결", "바꿀 토큰 선택", "토큰 연결(Associate) 후 교환"],
    reviews: [],
  },
  {
    id: "minswap", name: "민스왑", domain: "minswap.org", url: "https://minswap.org",
    district: "swap",
    action: "카르다노에서 코인 바꾸기",
    desc: "카르다노에서 거래가 가장 많은 탈중앙 거래소. ADA를 카르다노 생태계 토큰으로 바꿔요.",
    coins: ["ADA"],
    minKRW: 3000, difficulty: 2, minutes: 5,
    steps: ["레이스 지갑 연결", "바꿀 토큰 선택", "서명 후 몇 분 대기 (배치 처리)"],
    reviews: [],
  },
  {
    id: "reffinance", name: "레프 파이낸스", domain: "ref.finance", url: "https://www.ref.finance",
    district: "swap",
    action: "니어에서 코인 바꾸기",
    desc: "니어의 대표 탈중앙 거래소.",
    coins: ["NEAR", "USDC", "USDT"],
    minKRW: 3000, difficulty: 2, minutes: 5,
    steps: ["니어 지갑 연결", "바꿀 코인 선택", "서명"],
    reviews: [],
  },
  {
    id: "cetus", name: "세투스", domain: "cetus.zone", url: "https://www.cetus.zone",
    district: "swap",
    action: "수이에서 코인 바꾸기",
    desc: "수이의 대표 탈중앙 거래소. 2025년에 큰 해킹을 겪고 재개했어요. 소액으로만 써보길 권합니다.",
    coins: ["SUI", "USDC"],
    minKRW: 3000, difficulty: 2, minutes: 5,
    steps: ["슬러시 지갑 연결", "바꿀 코인 선택", "서명"],
    reviews: [],
  },
  {
    id: "aquarius", name: "아쿠아리우스", domain: "aqua.network", url: "https://aqua.network",
    district: "swap",
    action: "스텔라에서 코인 바꾸기",
    desc: "스텔라 네트워크의 교환·유동성 허브. XLM을 USDC 등으로 바꿀 수 있어요.",
    coins: ["XLM", "USDC"],
    minKRW: 2000, difficulty: 2, minutes: 5,
    steps: ["랍스터 등 스텔라 지갑 연결", "바꿀 자산 선택", "서명"],
    reviews: [],
  },
  {
    id: "sunio", name: "썬", domain: "sun.io", url: "https://sun.io",
    district: "swap",
    action: "트론에서 코인 바꾸기",
    desc: "트론의 대표 탈중앙 거래소. TRX와 트론 기반 USDT를 서로 바꿔요.",
    coins: ["TRX", "USDT"],
    minKRW: 3000, difficulty: 2, minutes: 5,
    steps: ["트론링크 연결", "바꿀 코인 선택", "서명 — 에너지(수수료)용 TRX 남겨두기"],
    reviews: [],
  },
  {
    id: "lfj", name: "LFJ (옛 트레이더 조)", domain: "lfj.gg", url: "https://lfj.gg",
    district: "swap",
    action: "아발란체에서 코인 바꾸기",
    desc: "아발란체의 대표 탈중앙 거래소. 예전 이름은 트레이더 조예요.",
    coins: ["AVAX", "USDC", "USDT"],
    minKRW: 3000, difficulty: 2, minutes: 5,
    steps: ["코어 지갑 연결", "바꿀 코인 선택", "서명"],
    reviews: [],
  },
  {
    id: "thala", name: "탈라", domain: "thala.fi", url: "https://www.thala.fi",
    district: "swap",
    action: "앱토스에서 코인 바꾸기",
    desc: "앱토스의 교환·유동 스테이킹 서비스.",
    coins: ["APT", "USDC"],
    minKRW: 3000, difficulty: 2, minutes: 5,
    steps: ["페트라 지갑 연결", "바꿀 코인 선택", "서명"],
    reviews: [],
  },
  {
    id: "alex", name: "알렉스", domain: "alexlab.co", url: "https://www.alexlab.co",
    district: "swap",
    action: "스택스에서 코인 바꾸기",
    desc: "비트코인 위 스택스 생태계의 대표 거래소.",
    coins: ["STX"],
    minKRW: 3000, difficulty: 2, minutes: 5,
    steps: ["레더 또는 엑스버스 지갑 연결", "바꿀 토큰 선택", "서명 후 블록 확정 대기"],
    reviews: [],
  },
  {
    id: "hydration", name: "하이드레이션", domain: "hydration.net", url: "https://hydration.net",
    district: "swap",
    action: "폴카닷에서 코인 바꾸기",
    desc: "폴카닷 생태계의 교환·예치 서비스.",
    coins: ["DOT", "USDT", "USDC"],
    minKRW: 3000, difficulty: 3, minutes: 10,
    steps: ["노바 월렛 등 연결", "DOT를 하이드레이션으로 전송", "바꿀 코인 선택 후 서명"],
    reviews: [],
  },
  {
    id: "quickswap", name: "퀵스왑", domain: "quickswap.exchange", url: "https://quickswap.exchange",
    district: "swap",
    action: "폴리곤에서 코인 바꾸기",
    desc: "폴리곤의 대표 탈중앙 거래소. 수수료가 몇 원이에요.",
    coins: ["POL", "USDC", "USDT", "ETH"],
    minKRW: 2000, difficulty: 2, minutes: 5,
    steps: ["메타마스크를 폴리곤 네트워크로 전환", "바꿀 코인 선택", "서명"],
    reviews: [],
  },

  // 돈 굴리기
  {
    id: "bonzo", name: "본조 파이낸스", domain: "bonzo.finance", url: "https://bonzo.finance",
    district: "earn",
    action: "HBAR 예치하고 이자 받기",
    desc: "헤데라의 예치·대출 서비스. 헤데라 공식 앱 목록에 올라 있어요.",
    coins: ["HBAR", "USDC"],
    minKRW: 5000, difficulty: 3, minutes: 10,
    steps: ["해시팩 지갑 연결", "Supply에서 자산 선택", "수량 입력 후 서명"],
    reviews: [],
  },
  {
    id: "liqwid", name: "리퀴드", domain: "liqwid.finance", url: "https://liqwid.finance",
    district: "earn",
    action: "ADA 예치하고 이자 받기",
    desc: "카르다노의 예치·대출 서비스. 맡긴 ADA도 스테이킹 보상을 계속 받아요.",
    coins: ["ADA"],
    minKRW: 5000, difficulty: 3, minutes: 10,
    steps: ["레이스 지갑 연결", "Supply에서 ADA 선택", "수량 입력 후 서명"],
    reviews: [],
  },
  {
    id: "metapool", name: "메타 풀", domain: "metapool.app", url: "https://www.metapool.app",
    district: "earn",
    action: "NEAR 유동 스테이킹",
    desc: "NEAR를 맡기고 stNEAR를 받아요. 지갑 스테이킹과 달리 기다리지 않고 바로 뺄 수 있는 길이 있습니다.",
    coins: ["NEAR"],
    minKRW: 5000, difficulty: 2, minutes: 5,
    steps: ["니어 지갑 연결", "NEAR 수량 입력", "stNEAR 수령"],
    reviews: [],
  },
  {
    id: "suilend", name: "수이렌드", domain: "suilend.fi", url: "https://suilend.fi",
    district: "earn",
    action: "SUI 예치하고 이자 받기",
    desc: "수이의 예치·대출 서비스.",
    coins: ["SUI", "USDC"],
    minKRW: 5000, difficulty: 3, minutes: 10,
    steps: ["슬러시 지갑 연결", "Deposit에서 자산 선택", "수량 입력 후 서명"],
    reviews: [],
  },
  {
    id: "blend", name: "블렌드", domain: "blend.capital", url: "https://www.blend.capital",
    district: "earn",
    action: "XLM·USDC 예치하고 이자 받기",
    desc: "스텔라의 예치·대출 서비스. 스텔라루멘으로 '돈 굴리기'를 해볼 수 있는 드문 곳이에요.",
    coins: ["XLM", "USDC"],
    minKRW: 5000, difficulty: 3, minutes: 10,
    steps: ["스텔라 지갑 연결", "풀 선택 후 Supply", "수량 입력 후 서명"],
    reviews: [],
  },
  {
    id: "stride", name: "스트라이드", domain: "stride.zone", url: "https://stride.zone",
    district: "earn",
    action: "ATOM 유동 스테이킹",
    desc: "ATOM을 맡기고 stATOM을 받아요. 지갑 스테이킹의 21일 대기 없이 stATOM을 팔아 나올 수 있습니다.",
    coins: ["ATOM"],
    minKRW: 5000, difficulty: 2, minutes: 5,
    steps: ["케플러 지갑 연결", "ATOM 수량 입력", "stATOM 수령"],
    reviews: [],
  },
  {
    id: "xrpfi", name: "플레어 XRPFi", domain: "flare.network", url: "https://xrpfi.flare.network",
    district: "earn",
    action: "XRP를 디파이로 가져가 굴리기",
    desc: "리플에는 원래 스테이킹이 없어요. 플레어 네트워크에서 XRP를 FXRP로 바꿔 예치·스테이킹하는 길이 2025년에 열렸습니다. 구조가 여러 겹이고, 상품에 따라 빼는 데 30~60일이 걸릴 수 있어 위험이 높은 편이에요.",
    coins: ["XRP"],
    minKRW: 10000, difficulty: 3, minutes: 20,
    steps: ["플레어 지원 지갑 준비", "XRP를 FXRP로 발행(Mint)", "예치·스테이킹 상품 선택 — 출금 조건 먼저 확인"],
    reviews: [],
  },
  {
    id: "babylon", name: "바빌론", domain: "babylonlabs.io", url: "https://btcstaking.babylonlabs.io",
    district: "earn",
    action: "비트코인 스테이킹",
    desc: "비트코인을 다른 체인으로 옮기지 않고 내 지갑에서 잠가 보상을 받아요. 최소 0.005 BTC가 필요하고, 풀 때 이틀쯤 걸립니다. 보상은 BTC가 아니라 BABY 토큰으로 나와요.",
    coins: ["BTC"],
    minKRW: 550000, difficulty: 3, minutes: 20,
    steps: ["지원 지갑(엑스버스 등) 연결", "수량과 기간, 검증자 선택", "비트코인 거래 서명"],
    reviews: [],
  },
  {
    id: "morpho", name: "모포", domain: "morpho.org", url: "https://morpho.org",
    district: "earn",
    action: "전문가가 굴리는 금고에 예치",
    desc: "큐레이터가 운용하는 '금고'에 맡기는 예치 서비스. 월드 앱 등 여러 앱의 이자 상품 뒤에서 돌아가는 인프라이기도 해요.",
    coins: ["ETH", "USDC", "USDT"],
    minKRW: 10000, difficulty: 3, minutes: 10,
    steps: ["지갑 연결", "금고(Vault)와 위험 설명 확인", "승인 + 예치 서명"],
    reviews: [],
  },
  {
    id: "sanctum", name: "생텀", domain: "sanctum.so", url: "https://sanctum.so",
    district: "earn",
    action: "SOL 유동 스테이킹 갈아타기",
    desc: "솔라나의 여러 스테이킹 토큰(mSOL, JitoSOL 등)을 서로 바꾸거나 한곳에서 맡길 수 있어요.",
    coins: ["SOL"],
    minKRW: 5000, difficulty: 2, minutes: 5,
    steps: ["팬텀 지갑 연결", "맡길 상품 선택", "서명"],
    reviews: [],
  },

  // 환승역
  {
    id: "nearintents", name: "니어 인텐트", domain: "near-intents.org", url: "https://near-intents.org",
    district: "transit",
    action: "체인이 다른 코인끼리 바로 교환",
    desc: "비트코인을 솔라나로, 이더리움을 니어로 — 브릿지 없이 체인을 넘나드는 교환. 수수료와 환율을 꼭 확인하세요.",
    coins: ["NEAR", "BTC", "ETH", "SOL", "USDC", "USDT"],
    minKRW: 5000, difficulty: 2, minutes: 5,
    steps: ["지갑 연결", "보낼 코인과 받을 코인 선택", "안내된 주소로 전송 또는 서명"],
    reviews: [],
  },

  // 출발지
  {
    id: "xverse", name: "엑스버스", domain: "xverse.app", url: "https://www.xverse.app",
    district: "start",
    action: "비트코인 전용 지갑 만들기",
    desc: "비트코인과 그 위의 생태계(오디널스, 스택스, 스테이킹)에 맞춘 지갑.",
    coins: ["BTC", "STX"],
    minKRW: 0, difficulty: 2, minutes: 10,
    steps: ["앱/확장 설치", "복구 문구 백업", "거래소에서 BTC 소액 출금"],
    reviews: [],
  },
  {
    id: "solflare", name: "솔플레어", domain: "solflare.com", url: "https://www.solflare.com",
    district: "start",
    action: "솔라나 지갑 만들고 스테이킹",
    desc: "팬텀과 함께 가장 많이 쓰는 솔라나 지갑. 지갑 안에서 검증인 스테이킹이 돼요.",
    coins: ["SOL", "USDC", "USDT", "JUP"],
    minKRW: 0, difficulty: 2, minutes: 10,
    steps: ["앱/확장 설치", "복구 문구 백업", "거래소에서 SOL 소액 출금"],
    reviews: [],
  },
  {
    id: "safe", name: "세이프", domain: "safe.global", url: "https://safe.global",
    district: "start",
    action: "여럿이 함께 서명하는 금고 지갑",
    desc: "'3명 중 2명이 서명해야 출금' 같은 규칙을 거는 지갑. 모임 회비나 큰 금액을 혼자 들고 있기 불안할 때 써요.",
    coins: ["ETH", "USDC", "USDT", "ARB", "OP", "POL", "AVAX"],
    minKRW: 1000, difficulty: 3, minutes: 20,
    steps: ["네트워크 선택", "서명자 주소와 필요한 서명 수 설정", "금고 생성 거래 서명"],
    reviews: [],
  },

  // 결제·쇼핑
  {
    id: "bitcoincommap", name: "비트코인닷컴 맵", domain: "map.bitcoin.com", url: "https://map.bitcoin.com",
    district: "pay",
    action: "코인 받는 가게 찾기 (BCH 중심)",
    desc: "비트코인캐시를 비롯해 코인을 받는 오프라인 매장 지도. 나라별로 등록 매장 수 차이가 커요.",
    coins: ["BCH", "BTC", "ETH"],
    minKRW: 3000, difficulty: 2, minutes: 5,
    steps: ["지도에서 주변 매장 찾기", "받는 코인 확인", "매장에서 QR로 결제"],
    offline: true,
    reviews: [],
  },
  {
    id: "worldmoney", name: "월드 머니 (옛 월드 앱)", domain: "world.org", url: "https://world.org/world-app",
    district: "pay",
    action: "앱 안에서 WLD 써보기",
    desc: "월드코인 공식 앱이 2026년 9월 '월드 머니'로 개편됐어요. 미니앱에서 WLD로 eSIM·기프트를 사거나 다른 자산으로 바꿀 수 있습니다. 나라에 따라 되는 기능이 달라요.",
    coins: ["WLD", "USDC"],
    minKRW: 3000, difficulty: 1, minutes: 10,
    steps: ["앱 설치 후 지갑 생성", "미니앱 둘러보기", "WLD로 결제하거나 교환"],
    reviews: [],
  },

  // 수집·티켓
  {
    id: "tradeport", name: "트레이드포트", domain: "tradeport.xyz", url: "https://www.tradeport.xyz",
    district: "collect",
    action: "수이·앱토스·니어 NFT 거래",
    desc: "여러 체인을 한곳에서 다루는 NFT 마켓. 수이·앱토스·니어 홀더가 NFT를 해볼 수 있는 곳이에요.",
    coins: ["SUI", "APT", "NEAR"],
    minKRW: 3000, difficulty: 2, minutes: 10,
    steps: ["체인 선택 후 지갑 연결", "컬렉션 탐색", "구매 서명"],
    reviews: [],
  },

  // 신원·이름
  {
    id: "adahandle", name: "에이다 핸들", domain: "handle.me", url: "https://handle.me",
    district: "identity",
    action: "$내이름 카르다노 주소 만들기",
    desc: "addr1…로 시작하는 긴 주소 대신 $이름으로 ADA를 받아요. 카르다노 공식 앱 목록에 올라 있습니다.",
    coins: ["ADA"],
    minKRW: 5000, difficulty: 2, minutes: 10,
    steps: ["원하는 핸들 검색", "안내된 주소로 ADA 결제", "지갑에서 핸들 확인"],
    reviews: [],
  },

  // 참여·후원
  {
    id: "subsquare", name: "서브스퀘어", domain: "polkadot.subsquare.io", url: "https://polkadot.subsquare.io",
    district: "join",
    action: "DOT로 폴카닷 안건 투표",
    desc: "폴카닷은 예산 집행까지 DOT 보유자 투표로 정해요. 투표하는 동안 DOT가 잠기지만 빠져나가지는 않습니다.",
    coins: ["DOT"],
    minKRW: 1000, difficulty: 2, minutes: 10,
    steps: ["지갑 연결", "진행 중인 안건 읽기", "찬반과 잠금 기간 선택 후 서명"],
    reviews: [],
  },
  {
    id: "geyser", name: "가이저", domain: "geyser.fund", url: "https://geyser.fund",
    district: "join",
    action: "비트코인으로 프로젝트 후원",
    desc: "비트코인(라이트닝)으로 후원하는 크라우드펀딩. 인도적 지원부터 오픈소스까지 다양해요.",
    coins: ["BTC"],
    minKRW: 1000, difficulty: 1, minutes: 5,
    steps: ["프로젝트 탐색", "후원 금액 입력", "라이트닝 지갑으로 QR 결제"],
    reviews: [],
  },
  {
    id: "ensagora", name: "ENS 아고라", domain: "agora.ensdao.org", url: "https://agora.ensdao.org",
    district: "join",
    action: "ENS 토큰으로 투표·위임",
    desc: "ENS 토큰은 이름 서비스의 투표권이에요. 직접 투표하거나 대표자에게 위임합니다.",
    coins: ["ENS"],
    minKRW: 500, difficulty: 2, minutes: 5,
    steps: ["지갑 연결", "대표자 살펴보기", "위임 서명"],
    reviews: [],
  },
];

// ── 자동 배치 ─────────────────────────────────────────────
// 구역은 둥근 사각형 '블록', 쓰임처는 블록 안에 격자로 놓인 이름 타일이다.
// 쓰임처를 추가할 때 좌표를 손댈 필요가 없다.
// 한 줄에 블록 둘(각 3열) 또는 하나(6열). 폰 화면에서 블록 하나가 읽히는 배율로 꽉 차는 너비다.
const ROWS: DistrictId[][] = [["join", "collect"], ["pay", "identity"], ["swap", "transit"], ["earn", "start"]];
export const TILE = { w: 176, h: 64, gap: 14 };
const HEADER = 76; // 블록 이름이 들어가는 높이
const BLOCK_GAP = 36;
const PAD = 50;
const BLOCK_W = 3 * TILE.w + 4 * TILE.gap;
const FULL_W = 2 * BLOCK_W + BLOCK_GAP;

function layout() {
  const inside = (id: DistrictId) => PLACE_DEFS.filter((p) => p.district === id);
  const districts: District[] = [];
  const places: Place[] = [];

  let y = PAD;
  for (const row of ROWS) {
    const single = row.length === 1;
    const cols = single ? 6 : 3;
    const w = single ? FULL_W : BLOCK_W;
    const tileW = (w - (cols + 1) * TILE.gap) / cols;
    const tileRows = Math.max(...row.map((id) => Math.ceil(inside(id).length / cols)), 1);
    const h = HEADER + tileRows * (TILE.h + TILE.gap) + TILE.gap;

    row.forEach((id, i) => {
      const x = PAD + i * (BLOCK_W + BLOCK_GAP);
      const def = DISTRICT_DEFS.find((d) => d.id === id)!;
      districts.push({ ...def, x, y, w, h });
      inside(id).forEach((p, n) => {
        places.push({
          ...p,
          w: tileW,
          x: x + TILE.gap + (n % cols) * (tileW + TILE.gap) + tileW / 2,
          y: y + HEADER + Math.floor(n / cols) * (TILE.h + TILE.gap) + TILE.h / 2,
        });
      });
    });
    y += h + BLOCK_GAP;
  }

  return { districts, places, world: { width: FULL_W + PAD * 2, height: y - BLOCK_GAP + PAD } };
}

const LAID_OUT = layout();
export const WORLD = LAID_OUT.world;
export const DISTRICTS = LAID_OUT.districts;
export const PLACES = LAID_OUT.places;
export const DISTRICT_BY_ID = Object.fromEntries(DISTRICTS.map((d) => [d.id, d])) as Record<DistrictId, District>;

export const PLACE_BY_ID = Object.fromEntries(PLACES.map((p) => [p.id, p]));

// 길 = 입문 경로. "이걸 했으면 다음엔 이걸 해보세요"
export const ROADS: [string, string][] = [
  ["upbit", "metamask"],
  ["bithumb", "metamask"],
  ["upbit", "phantom"],
  ["metamask", "base"],
  ["metamask", "arbitrum"],
  ["base", "uniswap"],
  ["arbitrum", "aave"],
  ["metamask", "lido"],
  ["phantom", "jito"],
  ["uniswap", "lido"],
  ["base", "bitrefill"],
  ["phantom", "bitrefill"],
  ["bitrefill", "travala"],
  ["bitrefill", "btcmap"],
  ["base", "zora"],
  ["zora", "opensea"],
  ["zora", "poap"],
  ["metamask", "ens"],
  ["ens", "worldid"],
  ["ens", "snapshot"],
  ["ens", "farcaster"],
  ["snapshot", "giveth"],
  ["giveth", "farcaster"],
  // 2026-09-19 추가
  ["upbit", "trustwallet"],
  ["upbit", "xaman"],
  ["upbit", "tronlink"],
  ["upbit", "slush"],
  ["upbit", "core"],
  ["upbit", "lobstr"],
  ["upbit", "mydoge"],
  ["upbit", "lace"],
  ["upbit", "mynearwallet"],
  ["upbit", "phoenix"],
  ["trustwallet", "ledger"],
  ["metamask", "revoke"],
  ["metamask", "optimism"],
  ["base", "across"],
  ["optimism", "across"],
  ["lido", "rocketpool"],
  ["phantom", "marinade"],
  ["phantom", "jupiter"],
  ["jupiter", "marinade"],
  ["phantom", "magiceden"],
  ["phantom", "drip"],
  ["phantom", "sns"],
  ["slush", "suins"],
  ["xaman", "coingate"],
  ["xaman", "xrpcafe"],
  ["xaman", "travala"],
  ["mydoge", "bitrefill"],
  ["mydoge", "coingate"],
  ["tronlink", "justlend"],
  ["tronlink", "bitrefill"],
  ["core", "benqi"],
  ["lobstr", "travala"],
  ["phoenix", "btcmap"],
  ["phoenix", "primal"],
  ["phoenix", "mullvad"],
  ["bitrefill", "coingate"],
  ["mullvad", "proton"],
  ["proton", "namecheap"],
  ["arbitrum", "tally"],
  ["snapshot", "tally"],
  ["giveth", "givingblock"],
  ["giveth", "gitcoin"],
  ["zora", "paragraph"],
  ["base", "layer3"],
  ["metamask", "linkstaking"],
  ["metamask", "polstaking"],
  ["brave", "givingblock"],
  // 2026-09-19 2차 추가
  ["upbit", "keplr"],
  ["upbit", "petra"],
  ["upbit", "hashpack"],
  ["upbit", "leather"],
  ["upbit", "novawallet"],
  ["upbit", "bitcoincom"],
  ["metamask", "rabby"],
  ["base", "jumper"],
  ["across", "jumper"],
  ["optimism", "superbridge"],
  ["metamask", "polygonportal"],
  ["lido", "etherfi"],
  ["aave", "compound"],
  ["phantom", "kamino"],
  ["jupiter", "kamino"],
  ["jupiter", "jupvote"],
  ["keplr", "osmosis"],
  ["keplr", "travala"],
  ["leather", "stackingdao"],
  ["leather", "gamma"],
  ["novawallet", "polkadotstaking"],
  ["petra", "amnis"],
  ["petra", "aptosnames"],
  ["hashpack", "travala"],
  ["bitcoincom", "mullvad"],
  ["bitcoincom", "travala"],
  ["phoenix", "silentlink"],
  ["namecheap", "njalla"],
  ["magiceden", "tensor"],
  ["opensea", "sandbox"],
  ["ens", "humanpassport"],
  ["humanpassport", "gitcoin"],
  ["optimism", "opvote"],
  ["tally", "opvote"],
  ["lobstr", "tor"],
  ["mydoge", "tor"],
  ["xaman", "internetarchive"],
  ["givingblock", "internetarchive"],
  ["layer3", "galxe"],
  ["giveth", "juicebox"],
  // 2026-09-19 3차 추가
  ["hashpack", "saucerswap"],
  ["saucerswap", "bonzo"],
  ["lace", "minswap"],
  ["minswap", "liqwid"],
  ["lace", "adahandle"],
  ["mynearwallet", "reffinance"],
  ["mynearwallet", "metapool"],
  ["reffinance", "nearintents"],
  ["slush", "cetus"],
  ["cetus", "suilend"],
  ["slush", "tradeport"],
  ["petra", "tradeport"],
  ["petra", "thala"],
  ["lobstr", "aquarius"],
  ["aquarius", "blend"],
  ["keplr", "stride"],
  ["tronlink", "sunio"],
  ["core", "lfj"],
  ["leather", "alex"],
  ["upbit", "xverse"],
  ["xverse", "babylon"],
  ["xverse", "alex"],
  ["novawallet", "hydration"],
  ["novawallet", "subsquare"],
  ["xaman", "xrpfi"],
  ["phoenix", "geyser"],
  ["aave", "morpho"],
  ["marinade", "sanctum"],
  ["upbit", "solflare"],
  ["solflare", "jupiter"],
  ["polygonportal", "quickswap"],
  ["metamask", "safe"],
  ["ledger", "safe"],
  ["bitcoincom", "bitcoincommap"],
  ["worldid", "worldmoney"],
  ["ens", "ensagora"],
  ["tally", "ensagora"],
];

export type Quest = { id: string; title: string; desc: string; placeIds: string[] };

export const QUESTS: Quest[] = [
  {
    id: "first-wallet",
    title: "거래소 탈출하기",
    desc: "거래소에 묶인 코인을 진짜 내 지갑으로",
    placeIds: ["upbit", "metamask", "base"],
  },
  {
    id: "first-spend",
    title: "코인으로 커피 한 잔",
    desc: "투자 말고, 처음으로 '써보기'",
    placeIds: ["metamask", "base", "bitrefill"],
  },
  {
    id: "first-name",
    title: "내 이름 주소 갖기",
    desc: "0x… 대신 이름으로 송금받기",
    placeIds: ["metamask", "ens", "farcaster"],
  },
  {
    id: "xrp-first",
    title: "리플 홀더의 첫 사용",
    desc: "거래소에만 있던 XRP로 뭐라도 사보기",
    placeIds: ["upbit", "xaman", "coingate"],
  },
  {
    id: "doge-first",
    title: "도지로 커피 쿠폰",
    desc: "밈 코인도 쓸 데가 있다",
    placeIds: ["upbit", "mydoge", "bitrefill"],
  },
  {
    id: "first-stake",
    title: "잠자는 ETH 깨우기",
    desc: "지갑에 두기만 하던 코인에 이자 붙이기",
    placeIds: ["metamask", "revoke", "lido"],
  },
];

// 거래소·지갑(출발지)은 '쓰는 곳'이 아니므로 쓰임처 수에서 뺀다
export function usesOf(symbol: CoinSymbol): Place[] {
  return PLACES.filter((p) => p.district !== "start" && p.coins.includes(symbol));
}

export function startsOf(symbol: CoinSymbol): Place[] {
  return PLACES.filter((p) => p.district === "start" && p.coins.includes(symbol));
}

export function placesForCoins(symbols: CoinSymbol[]): Place[] {
  if (symbols.length === 0) return PLACES;
  return PLACES.filter((p) => p.coins.some((c) => symbols.includes(c)));
}
