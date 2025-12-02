import type { BubbleSettingType } from "../data/BubbleSetting";

export type BubbleVariant = "ordinary" | "danger" | "lucky";

export type BubbleType = {
  id: string | number;
  x: number;
  xRef: number;
  y: number;
  isPopped: boolean;
  variant: BubbleVariant;
  settings: BubbleSettingType;
};
