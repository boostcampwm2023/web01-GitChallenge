const initialData = [
  {
    id: "bcc85c07b7ab84e5a90f6a0ea4dbdc925fca946c",
    parentId:
      "ecd20b79b81e1a8ee6aa8c9439f6671fa0cadab6 53fed6b571f4fccdcaa32dcda2bd30c7cb05076f",
    message: "호호호",
    refs: "HEAD -> branch2",
  },
  {
    id: "ecd20b79b81e1a8ee6aa8c9439f6671fa0cadab6",
    parentId: "17a8952f5a8576bd3cf1ae2197ca9868ac3eee36",
    message: "2",
    refs: "",
  },
  {
    id: "af03bfdccbda496fb9e596fa5ba26e02b04a62fc",
    parentId:
      "4adfb8e3c5ec301691c00f9edc415cadfa3eb1ac 53fed6b571f4fccdcaa32dcda2bd30c7cb05076f",
    message: "하하하",
    refs: "branch1",
  },
  {
    id: "53fed6b571f4fccdcaa32dcda2bd30c7cb05076f",
    parentId: "17a8952f5a8576bd3cf1ae2197ca9868ac3eee36",
    message: "config:~~",
    refs: "main",
  },
  {
    id: "4adfb8e3c5ec301691c00f9edc415cadfa3eb1ac",
    parentId: "17a8952f5a8576bd3cf1ae2197ca9868ac3eee36",
    message: "1과 2의 가운데",
    refs: "",
  },
  {
    id: "17a8952f5a8576bd3cf1ae2197ca9868ac3eee36",
    parentId: "",
    message: "initial commit",
    refs: "",
  },
];

const newMockData = [
  {
    id: "bcc85c07b7ab84e5a90f6a0ea4dbdc925fca946c",
    parentId:
      "ecd20b79b81e1a8ee6aa8c9439f6671fa0cadab6 53fed6b571f4fccdcaa32dcda2bd30c7cb05076f",
    message: "호호호",
    refs: "HEAD -> branch2",
  },
  {
    id: "ecd20b79b81e1a8ee6aa8c9439f6671fa0cadab6",
    parentId: "17a8952f5a8576bd3cf1ae2197ca9868ac3eee36",
    message: "2",
    refs: "",
  },
  {
    id: "af03bfdccbda496fb9e596fa5ba26e02b04a62fc",
    parentId:
      "4adfb8e3c5ec301691c00f9edc415cadfa3eb1ac 53fed6b571f4fccdcaa32dcda2bd30c7cb05076f",
    message: "하하하",
    refs: "branch1",
  },
  {
    id: "53fed6b571f4fccdcaa32dcda2bd30c7cb05076f",
    parentId: "17a8952f5a8576bd3cf1ae2197ca9868ac3eee36",
    message: "config:~~",
    refs: "main",
  },
  {
    id: "777",
    parentId: "53fed6b571f4fccdcaa32dcda2bd30c7cb05076f",
    message: "config 자식",
    refs: "",
  },
  {
    id: "4adfb8e3c5ec301691c00f9edc415cadfa3eb1ac",
    parentId: "17a8952f5a8576bd3cf1ae2197ca9868ac3eee36",
    message: "1과 2의 가운데",
    refs: "",
  },
  {
    id: "17a8952f5a8576bd3cf1ae2197ca9868ac3eee36",
    parentId: "",
    message: "initial commit",
    refs: "",
  },
];

const deletedData = [
  {
    id: "bcc85c07b7ab84e5a90f6a0ea4dbdc925fca946c",
    parentId:
      "ecd20b79b81e1a8ee6aa8c9439f6671fa0cadab6 53fed6b571f4fccdcaa32dcda2bd30c7cb05076f",
    message: "호호호Merge branch 'main' into branch2",
    refs: "HEAD -> branch2",
  },
  {
    id: "ecd20b79b81e1a8ee6aa8c9439f6671fa0cadab6",
    parentId: "17a8952f5a8576bd3cf1ae2197ca9868ac3eee36",
    message: "2",
    refs: "",
  },
  {
    id: "53fed6b571f4fccdcaa32dcda2bd30c7cb05076f",
    parentId: "17a8952f5a8576bd3cf1ae2197ca9868ac3eee36",
    message: "config:~~",
    refs: "main",
  },
  {
    id: "4adfb8e3c5ec301691c00f9edc415cadfa3eb1ac",
    parentId: "17a8952f5a8576bd3cf1ae2197ca9868ac3eee36",
    message: "1과 2의 가운데",
    refs: "",
  },
  {
    id: "17a8952f5a8576bd3cf1ae2197ca9868ac3eee36",
    parentId: "",
    message: "initial commit",
    refs: "",
  },
];

export { initialData, newMockData, deletedData };
