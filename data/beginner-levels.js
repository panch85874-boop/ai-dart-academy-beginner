(function () {
  "use strict";

  const levelMeta = [
    {
      level: 1,
      title: "AI 不是聊天，是任務委託",
      goal: "知道 AI 可以協助完成任務，不只是陪聊天。",
      intro: "這一關練習把 AI 當成任務幫手。你會分辨閒聊和任務委託，開始把目標說出來。",
      badge: "任務委託新手",
      focus: "任務委託",
      good: "請幫我整理一份給國小生看的太陽系介紹，列 5 點重點。",
      weak: "跟我聊太空。",
      output: "5 點重點清單",
      audience: "國小生",
      limit: "不要使用太艱深的術語"
    },
    {
      level: 2,
      title: "把任務講清楚",
      goal: "會說明目標、對象、用途、輸出格式。",
      intro: "這一關練習四個基本欄位：目標、對象、用途、輸出格式。講清楚，AI 才容易做對。",
      badge: "任務說明達人",
      focus: "清楚任務",
      good: "請幫我寫給家長看的活動通知，用表格列日期、地點、攜帶物品。",
      weak: "幫我寫通知。",
      output: "表格",
      audience: "家長",
      limit: "語氣清楚、有禮貌"
    },
    {
      level: 3,
      title: "補背景與限制",
      goal: "會補情境、限制條件、不可做事項。",
      intro: "這一關練習補背景和限制。限制不是麻煩，是讓 AI 不要走錯方向的護欄。",
      badge: "限制條件守門員",
      focus: "背景限制",
      good: "我要做 3 分鐘分享，對象是初學者，請用生活例子，不要提付費功能。",
      weak: "幫我做分享稿。",
      output: "3 分鐘講稿",
      audience: "初學者",
      limit: "不要提付費功能"
    },
    {
      level: 4,
      title: "讓 AI 先追問",
      goal: "資訊不足時，要求 AI 先問問題，不要直接亂做。",
      intro: "這一關練習請 AI 先追問。當資料不夠時，先釐清，比直接產出更可靠。",
      badge: "追問啟動者",
      focus: "先問問題",
      good: "如果資訊不足，請先問我最多 3 個關鍵問題，再開始寫。",
      weak: "資料不夠你自己猜。",
      output: "最多 3 個問題",
      audience: "任務提出者",
      limit: "不要自行假設重要事實"
    },
    {
      level: 5,
      title: "Prompt 模板化",
      goal: "把常用任務變成可重複使用的模板。",
      intro: "這一關練習把常用任務變成模板。模板讓你每次只要替換欄位，就能穩定重複使用。",
      badge: "模板整理師",
      focus: "Prompt 模板",
      good: "請把這個任務整理成模板，保留【目標】【對象】【限制】【輸出格式】欄位。",
      weak: "下次也差不多這樣做。",
      output: "可替換欄位模板",
      audience: "未來的自己",
      limit: "不要把一次性的細節寫死"
    },
    {
      level: 6,
      title: "認識 Codex",
      goal: "知道 Codex 適合做檔案、程式、修改、測試與交付，不是拿來空泛聊天。",
      intro: "這一關認識 Codex 的用途。它適合讀檔、改檔、寫程式、跑驗證和回報交付內容。",
      badge: "Codex 入門者",
      focus: "Codex 用途",
      good: "請在這個資料夾建立 index.html、style.css，完成後回報檔案與驗證方式。",
      weak: "你覺得我的專案怎樣？",
      output: "檔案與回報",
      audience: "專案協作者",
      limit: "不要碰未指定的資料夾"
    },
    {
      level: 7,
      title: "寫第一份專案需求",
      goal: "會把一個想法寫成 Codex 看得懂的任務規格。",
      intro: "這一關練習把想法變成規格。規格不用很長，但要有目標、檔案、限制和驗收標準。",
      badge: "需求規格新手",
      focus: "專案需求",
      good: "請建立一個待辦清單網頁，包含新增、完成、刪除，資料存在同一台裝置。",
      weak: "幫我做一個很厲害的網站。",
      output: "可驗收的任務規格",
      audience: "Codex",
      limit: "第一版不要登入、不要後台"
    },
    {
      level: 8,
      title: "讓 Codex 產生檔案",
      goal: "會要求 Codex 建資料夾、建立檔案、回報完成內容。",
      intro: "這一關練習要求 Codex 產生檔案。你會清楚指定路徑、檔名、內容和完成回報。",
      badge: "檔案建立指揮官",
      focus: "產生檔案",
      good: "請建立 docs/README.md，寫 5 行使用說明，完成後列出實際路徑。",
      weak: "幫我弄一些文件。",
      output: "實際檔案路徑清單",
      audience: "專案使用者",
      limit: "不要覆蓋既有重要檔案"
    },
    {
      level: 9,
      title: "驗收與修正",
      goal: "會檢查 Codex 做了什麼、哪些通過、哪些要修。",
      intro: "這一關練習驗收。不要只看 Codex 說完成，要看檔案、測試、畫面和剩下風險。",
      badge: "驗收檢查員",
      focus: "驗收修正",
      good: "請列出完成項目、改了哪些檔案、跑了哪些驗證、還有哪些風險。",
      weak: "好了嗎？",
      output: "驗收報告",
      audience: "專案負責人",
      limit: "沒驗證的地方要明講"
    },
    {
      level: 10,
      title: "完成第一個簡單專案",
      goal: "完成一個簡單網頁或小工具原型，並整理成可分享成果。",
      intro: "最後一關練習把小專案收尾。你會要求產出、驗證、說明文件和分享方式。",
      badge: "第一個專案完成者",
      focus: "專案收尾",
      good: "請完成一頁式計算機，附 README、使用方式、限制與驗收結果。",
      weak: "幫我完成全部，越多越好。",
      output: "可分享成果",
      audience: "GitHub 訪客",
      limit: "不要加入未要求的大功能"
    }
  ];

  function shuffleChoices(correct, wrongA, wrongB, wrongC) {
    return [correct, wrongA, wrongB, wrongC];
  }

  function makeMultipleChoice(meta, index, question, answer, wrongA, wrongB, wrongC, hint, explanation) {
    return {
      id: `L${String(meta.level).padStart(2, "0")}-A${String(index).padStart(2, "0")}`,
      level: meta.level,
      gameType: "dart",
      question,
      options: shuffleChoices(answer, wrongA, wrongB, wrongC),
      answer,
      hint,
      explanation,
      voiceText: `${meta.title}。${question}`,
      rewardText: `命中靶心！你抓到「${meta.focus}」的重點了。`
    };
  }

  function makePuzzle(meta, index, task, answer, hint, explanation) {
    const distractor = meta.level % 2 === 0 ? "請自由發揮" : "不用說明限制";
    return {
      id: `L${String(meta.level).padStart(2, "0")}-B${String(index).padStart(2, "0")}`,
      level: meta.level,
      gameType: "puzzle",
      question: task,
      options: answer.concat([distractor]),
      answer,
      hint,
      explanation,
      voiceText: `${meta.title}。${task}`,
      rewardText: "拼得很穩！這句 Prompt 比較清楚，也比較容易被執行。"
    };
  }

  function buildLevel(meta) {
    const a = [];
    a.push(makeMultipleChoice(meta, 1, `哪一句最像把 AI 當成「${meta.focus}」幫手？`, meta.good, meta.weak, "你看著辦就好。", "隨便講一點就好。", "找有明確目標和輸出格式的句子。", `好的任務會讓 AI 知道要做什麼、給誰看、要輸出什麼。`));
    a.push(makeMultipleChoice(meta, 2, "如果希望 AI 做出可使用的結果，最重要的是先說什麼？", "任務目標", "今天心情", "AI 的名字", "越長越好", "先找會影響結果方向的資訊。", "任務目標會決定 AI 要往哪個方向完成工作。"));
    a.push(makeMultipleChoice(meta, 3, `在這一關，哪個資訊最符合「對象」？`, meta.audience, meta.output, meta.limit, "顏色越多越好", "對象是成果要給誰看。", "對象會影響語氣、深度與例子。"));
    a.push(makeMultipleChoice(meta, 4, "哪一個要求可以讓結果比較容易檢查？", `請輸出成${meta.output}`, "你寫好一點", "你自己決定", "不用列格式", "可檢查的格式通常比模糊形容更好。", "指定輸出格式，驗收時比較容易知道有沒有做到。"));
    a.push(makeMultipleChoice(meta, 5, "下面哪一句比較不容易讓 AI 亂猜？", `限制：${meta.limit}`, "你應該知道我要什麼", "照一般情況處理", "不用問，直接猜", "限制條件可以擋掉錯誤方向。", "把不可做事項說出來，可以降低誤解。"));
    a.push(makeMultipleChoice(meta, 6, "當資訊不夠時，比較好的做法是什麼？", "請 AI 先問關鍵問題", "要求 AI 直接編完整答案", "把缺的資料藏起來", "只說快一點", "資訊不足時，先釐清比硬做更可靠。", "先追問能減少錯誤假設。"));
    a.push(makeMultipleChoice(meta, 7, "哪個回覆最適合當作答對後的自我檢查？", "我能說出目標、對象、限制和輸出", "我只要按下一步", "我記得按鈕顏色", "我讓 AI 猜完了", "自我檢查要對應學習目標。", "能說出任務要素，代表你不是只靠感覺操作。"));
    a.push(makeMultipleChoice(meta, 8, `哪個選項最符合「${meta.title}」？`, meta.good, "請幫我聊天，內容不限。", "越專業越好，不用說原因。", "做一個很厲害的東西。", "選能被執行與驗收的句子。", "清楚、具體、有限制的句子更適合交給 AI 執行。"));

    const p = [];
    p.push(makePuzzle(meta, 1, "把這句 Prompt 排成清楚順序。", ["請幫我完成任務：", meta.good, `輸出格式：${meta.output}`, `限制：${meta.limit}`], "先說要做什麼，再補格式和限制。", "清楚順序能讓 AI 先理解任務，再理解交付規格。"));
    p.push(makePuzzle(meta, 2, "排出一個能讓 AI 先釐清的 Prompt。", ["如果資訊不足，", "請先問我最多 3 個關鍵問題，", "等我回答後，", `再輸出${meta.output}`], "先放條件，再說要問什麼。", "要求先追問，可以避免 AI 在資料不足時亂做。"));
    p.push(makePuzzle(meta, 3, "把常用任務整理成模板順序。", ["【目標】", "【對象】", "【限制】", "【輸出格式】"], "模板欄位要能重複替換。", "固定欄位能讓下次委託更穩定。"));
    p.push(makePuzzle(meta, 4, "排出適合交給 Codex 的工作說法。", ["請在指定資料夾", "建立或修改指定檔案", "完成後列出改了什麼", "並說明如何驗證"], "Codex 任務要包含檔案與驗證。", "Codex 很適合做檔案、程式和可驗證交付。"));
    p.push(makePuzzle(meta, 5, "排出一段驗收要求。", ["請回報完成項目", "列出修改檔案", "列出驗證結果", "說明還有哪些風險"], "驗收要看證據，不只看一句完成。", "好的驗收能讓你知道成果能不能真的使用。"));
    p.push(makePuzzle(meta, 6, "排出一段安全限制。", ["不要收集個資", "不要串接外部 API", "不要修改正式資料", "不確定資訊標示需要驗證"], "安全限制要明確說不可做什麼。", "把不可做事項寫清楚，能保護資料與範圍。"));
    p.push(makePuzzle(meta, 7, "排出小專案第一版收尾順序。", ["完成最小功能", "寫使用說明", "做本機驗證", "整理可分享成果"], "先能用，再整理分享。", "第一版重點是小而完整，可以被別人打開和理解。"));
    return a.concat(p);
  }

  const levels = levelMeta.flatMap(buildLevel);
  window.BEGINNER_LEVEL_META = levelMeta;
  window.BEGINNER_LEVELS = levels;
})();