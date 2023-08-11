import React, { MouseEvent } from "react";

export type RegisterFormContextProps = {
  step: number
  handleNext?: () => void
  handleBack?: () => void
  accountTypes?: {
    title: string
    selected: boolean
    Icon: React.Component | any
  }[]
  accountType: string
  handleAccountType?: (type: string) => void
  setAccountTypes: (accountTypes: any) => void
  showPassword: boolean
  setShowPassword: (showPassword: boolean) => void
  handleClickShowPassword: () => void
  handleMouseDownPassword: (e: MouseEvent<HTMLButtonElement>) => void
  error: string
  formik: any
}
