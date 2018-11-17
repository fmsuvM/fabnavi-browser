// id: 3029 - root project
// 夏休み，自由研究，小学生，完成
/**
 * 夏休みタグ - id: 3250,
 * 自由研究 - ストロー紙ぐるま
 * 小学生 - カッターのヤイバの出し方
 * 完成 - id 3211
 * tkd - id: 3250, 3211,
 */
const childA = {
  name: 'ストロー紙車',
  tags: [
    {
      filter: true,
      tag: 'ストロー'
    },
    {
      filter: true,
      tag: 'コンビニ'
    },
    {
      filter: true,
      tag: '風車'
    },
    {
      filter: true,
      tag: '息'
    },
    {
      filter: true,
      tag: '自由研究'
    }
  ],
  figures: [],
  children: [
    {
      name: '自由研究1',
      tags: [
        {
          filter: true,
          tag: '自由研究'
        },
        {
          filter: true,
          tag: 'スポンジ'
        }
      ],
      figures: []
    },
    {
      name: '自由研究2',
      tags: [
        {
          filter: true,
          tag: '自由研究'
        },
        {
          filter: true,
          tag: '粘土'
        }
      ],
      figures: []
    },
    {
      name: '自由研究3',
      tags: [
        {
          filter: true,
          tag: '自由研究'
        },
        {
          filter: true,
          tag: '半田付け'
        }
      ],
      figures: []
    }
  ]
};

const childB = {
  name: '新山マルチクリップ&ポールジョイント',
  tags: [
    {
      filter: true,
      tag: 'tkd'
    },
    {
      filter: true,
      tag: '夏休み'
    }
  ],
  figures: []
};

const childC = {
  name: 'カッターの刃の出し方',
  tags: [
    {
      filter: true,
      tag: '使い方'
    },
    {
      filter: true,
      tag: '小学生'
    },
    {
      filter: true,
      tag: 'tkd'
    }
  ],
  figures: []
};

export default {
  name: 'Root',
  tags: [
    {
      filter: true,
      tag: '夏休み'
    },
    {
      filter: true,
      tag: '自由研究'
    },
    {
      filter: true,
      tag: '小学生'
    },
    {
      filter: true,
      tag: '完成'
    }
  ],
  figures: [],
  children: [childA, childB, childC]
};
