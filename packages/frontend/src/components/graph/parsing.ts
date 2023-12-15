export interface InitialDataProps {
  id: string;
  parentId: string;
  message: string;
  refs: string;
  color?: string;
}

export type AdditionalLinksType = Pick<InitialDataProps, "id" | "parentId">[];

export function parsingMultipleParents(initialData: InitialDataProps[]) {
  const additionalLinks: AdditionalLinksType = [];
  const parsedData = initialData.map((data) => {
    const [first, ...rest] = data.parentId.split(" ");
    rest.forEach((v) => {
      additionalLinks.push({ id: data.id, parentId: v });
    });

    return {
      ...data,
      parentId: first,
    };
  });

  return { parsedData, additionalLinks };
}
