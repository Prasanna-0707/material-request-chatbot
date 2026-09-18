import { useEffect, useState } from 'react'

import Header from './components/Header'

import ProgressSidebar from './components/ProgressSidebar'

import QuestionCard from './components/QuestionCard'

import NavigationButtons from './components/NavigationButtons'

import TextInput from './components/TextInput'

import LanguageSelect from './components/LanguageSelect'

import DistributionDetails from './components/DistributionDetails'

import ReviewRequest from './components/ReviewRequest'

import StartRequest from './components/StartRequest'

import RequestSetupForm from './components/RequestSetupForm'

import MaterialTypeSelector from './components/MaterialTypeSelector'

import ValuationDetails from './components/ValuationDetails'

import {

  businessTypeOptions,

} from './data/questions'

import { translateDescription } from './data/translation'

/* =========================================================

   VALIDATION CHECKS

========================================================= */

const validationChecks = [

  'Checking required fields',

  'Checking derived SAP values',

  'Checking material configuration',

  'Preparing CR Preview',

]

/* =========================================================

   MATERIAL TYPE PREVIEW DATA

========================================================= */

const materialTypePreviewData = {

  ZLDI: {

    baseUnit: 'PC',

    industrySector: 'M',

    materialGroup: 'MXA',

    genericItemGroupCategory: 'LEIS',

    netWeight: '0,000',

    grossWeight: '0,000',

    weightUnit: 'KG',

    transportationGroup: '',

  },

  ZLHW: {

    baseUnit: 'PC',

    industrySector: 'M',

    materialGroup: 'MXA',

    genericItemGroupCategory: 'BANS',

    netWeight: '999,000',

    grossWeight: '999,000',

    weightUnit: 'KG',

    transportationGroup: '9999',

  },

  ZLVP: {

    baseUnit: 'PC',

    industrySector: 'M',

    materialGroup: 'MXA',

    genericItemGroupCategory: 'VERP',

    netWeight: '999,000',

    grossWeight: '999,000',

    weightUnit: 'KG',

    transportationGroup: '9999',

  },

  ZLUE: {

    baseUnit: 'PC',

    industrySector: 'M',

    materialGroup: 'MXA',

    genericItemGroupCategory: 'ZTRN',

    netWeight: '999,000',

    grossWeight: '999,000',

    weightUnit: 'KG',

    transportationGroup: '9999',

  },

}

/* =========================================================

   EMPTY PREVIEW VALUES

========================================================= */

const createEmptyPreviewValues = () => ({

  marketingRelease: '99',

  businessUnit: '',

  businessSegment: '',

  businessLine: '',

  sapPmNumber: '',

  productClassificationKey: '',

  productSpareService: '',

  materialCategories: '',

  baseUnit: '',

  materialGroup: '',

  externalMaterialGroup: '',

  oldMaterialNumber: '',

  division: '',

  netWeight: '',

  grossWeight: '',

  eanUpc: '',

  eanCategory: '',

  descriptionEn: '',

  descriptionOther: '',

  itemCategoryGroup: 'ZLES',

  materialGroup1: '',

  materialGroup2: '',

  materialGroup3: '',

  materialGroup4: '',

  materialGroup5: '',

  taxm1: '',

  taxm2: '',

  taxm3: '',

  availabilityCheckGroup: '',

  loadingGroup: '',

  purchasingGroup: '',

  profitCenter: '',

  serialNumberProfile: '',

  batchManagement: '',

  controlCode: '',

  countryOfOrigin: '',

  priceCode: '',

  validFrom: '',

  validTo: '',

  materialPrice: '',

  currency: '',

  sourceListRequirement: '',

  countryRestriction: '',

})

/* =========================================================

   BUILD PREVIEW VALUES

========================================================= */

const buildPreviewValues = ({

  materialType,

  division,

  description,

  translatedDescription,

  loadingGroup,

  purchasingGroup,

}) => {

  const materialData =

    materialTypePreviewData[materialType] ||

    materialTypePreviewData.ZLDI

  const isLoadingGroupRequired =

    materialType === 'ZLHW' ||

    materialType === 'ZLVP'

  const derivedLoadingGroup =

    loadingGroup ||

    (isLoadingGroupRequired ? '0003' : '')

  const derivedPurchasingGroup =

    purchasingGroup || 'AU1'

  return {

    marketingRelease: '99',

    businessUnit: '',

    businessSegment: '',

    businessLine: '',

    sapPmNumber: '',

    productClassificationKey: '',

    productSpareService: '',

    materialCategories: '',

    baseUnit: materialData.baseUnit,

    materialGroup: materialData.materialGroup,

    externalMaterialGroup: '',

    oldMaterialNumber: '',

    division,

    netWeight: materialData.netWeight,

    grossWeight: materialData.grossWeight,

    eanUpc: '',

    eanCategory: '',

    descriptionEn: description,

    descriptionOther: translatedDescription,

    itemCategoryGroup: 'ZLES',

    materialGroup1: '',

    materialGroup2: '',

    materialGroup3: '',

    materialGroup4: '',

    materialGroup5: '',

    taxm1: '',

    taxm2: '',

    taxm3: '',

    availabilityCheckGroup: '',

    loadingGroup: derivedLoadingGroup,

    purchasingGroup: derivedPurchasingGroup,

    profitCenter: '',

    serialNumberProfile: '',

    batchManagement: '',

    controlCode: '',

    countryOfOrigin: '',

    priceCode: '',

    validFrom: '',

    validTo: '',

    materialPrice: '',

    currency: '',

    sourceListRequirement: '',

    countryRestriction: '',

  }

}

/* =========================================================

   APP

========================================================= */

function App() {

  const [currentStep, setCurrentStep] = useState(1)

  const [isSubmitted, setIsSubmitted] = useState(false)

  // =========================================

  // STEP 2 — REQUEST SETUP

  // =========================================

  const [requestorGid] = useState('Z0004HUO')

  const [requestorEmail] = useState(

    'fischer.tf@siemens-healthineers.com',

  )

  const [crType, setCrType] = useState('')

  const [countryOwner, setCountryOwner] = useState('')

  const [mcmn, setMcmn] = useState('')

  // =========================================

  // STEP 3 — MATERIAL TYPE

  // =========================================

  const [materialType, setMaterialType] = useState('')

  // =========================================

  // STEP 4 — BUSINESS TYPE + DIVISION

  // =========================================

  const [businessTypes, setBusinessTypes] = useState([])

  const [division, setDivision] = useState('')

  // =========================================

  // STEP 5 — MATERIAL DETAILS

  // =========================================

  const [description, setDescription] = useState('')

  const [additionalLanguage, setAdditionalLanguage] = useState('')

  const [materialCategory, setMaterialCategory] = useState('')

  // =========================================

  // STEP 6 — DISTRIBUTION DETAILS

  // =========================================

  const [

    selectedSalesOrganizations,

    setSelectedSalesOrganizations,

  ] = useState([])

  const [distributionChain, setDistributionChain] = useState('')

  const [

    additionalInformation,

    setAdditionalInformation,

  ] = useState('')

  const [loadingGroup, setLoadingGroup] = useState('')

  const [purchasingGroup, setPurchasingGroup] = useState('')

  // =========================================

  // STEP 7 — VALUATION

  // =========================================

  const [valuationClass, setValuationClass] = useState('')

  // =========================================

  // STEP 8 — VALIDATION

  // =========================================

  const [validationProgress, setValidationProgress] =

    useState(0)

  const [validationComplete, setValidationComplete] =

    useState(false)

  // =========================================

  // STEP 9 — PREVIEW

  // =========================================

  const [previewEditableValues, setPreviewEditableValues] =

    useState(createEmptyPreviewValues())

  const [previewInitialized, setPreviewInitialized] =

    useState(false)

  // =========================================

  // TRANSLATION

  // =========================================

  const translatedDescription = translateDescription(

    description,

    additionalLanguage,

  )

  // =========================================

  // VALIDATION PROCESS

  // =========================================

  useEffect(() => {

  if (currentStep !== 8) {

    return

  }

  setValidationProgress(0)

  setValidationComplete(false)

  const timers = []

  validationChecks.forEach((_, index) => {

    const timer = setTimeout(() => {

      setValidationProgress(index + 1)

    }, (index + 1) * 900)

    timers.push(timer)

  })

  const completeTimer = setTimeout(() => {

    setValidationComplete(true)

  }, validationChecks.length * 900 + 400)

  timers.push(completeTimer)

  return () => {

    timers.forEach((timer) => {

      clearTimeout(timer)

    })

  }

}, [currentStep])

  // =========================================

  // STEP 1 → STEP 2

  // =========================================

  const handleStartRequest = () => {

    setCurrentStep(2)

  }

  // =========================================

  // NEW REQUEST

  // =========================================

  const handleNewRequest = () => {

    setCurrentStep(1)

    setIsSubmitted(false)

    // Request Setup

    setCrType('')

    setCountryOwner('')

    setMcmn('')

    // Material

    setMaterialType('')

    // Business Classification

    setBusinessTypes([])

    setDivision('')

    // Material Details

    setDescription('')

    setAdditionalLanguage('')

    setMaterialCategory('')

    // Distribution

    setSelectedSalesOrganizations([])

    setDistributionChain('')

    setAdditionalInformation('')

    setLoadingGroup('')

    setPurchasingGroup('')

    // Valuation

    setValuationClass('')

    // Validation

    setValidationProgress(0)

    setValidationComplete(false)

    // Preview

    setPreviewInitialized(false)

    setPreviewEditableValues(

      createEmptyPreviewValues(),

    )

  }

  // =========================================

  // PREVIEW EDIT

  // =========================================

  const handlePreviewEdit = (

    field,

    value,

  ) => {

    setPreviewEditableValues((previous) => ({

      ...previous,

      [field]: value,

    }))

    // Sync important values back to main state

    if (field === 'descriptionEn') {

      setDescription(value)

    }

    if (field === 'division') {

      setDivision(value)

    }

    if (field === 'loadingGroup') {

      setLoadingGroup(value)

    }

    if (field === 'purchasingGroup') {

      setPurchasingGroup(value)

    }

  }

  // =========================================

  // SUBMIT REQUEST

  // =========================================

  const handleSubmit = () => {

    const materialData =

      materialTypePreviewData[materialType] ||

      materialTypePreviewData.ZLDI

    const submittedRequest = {

      id: Date.now(),

      // Request Setup

      requestorGid,

      requestorEmail,

      crType,

      countryOwner,

      mcmn,

      // Material

      materialType,

      // Business

      businessTypes,

      division,

      // Material Details

      description:

        previewEditableValues.descriptionEn ||

        description,

      additionalLanguage,

      translatedDescription:

        previewEditableValues.descriptionOther ||

        translatedDescription,

      materialCategory,

      // Distribution

      selectedSalesOrganizations,

      distributionChain,

      additionalInformation,

      loadingGroup:

        previewEditableValues.loadingGroup ||

        loadingGroup,

      purchasingGroup:

        previewEditableValues.purchasingGroup ||

        purchasingGroup,

      // Valuation

      valuationClass,

      // Validation

      validationCompleted: validationComplete,

      // Preview

      previewData: {

        generalData: {

          crOwnerGid: requestorGid,

          crOwnerEmail: requestorEmail,

          crType,

        },

        localMaterialsExtendedBasic: {

          countryOwner,

          marketingRelease:

            previewEditableValues.marketingRelease,

          businessUnit:

            previewEditableValues.businessUnit,

          businessSegment:

            previewEditableValues.businessSegment,

          businessLine:

            previewEditableValues.businessLine,

          sapPmNumber:

            previewEditableValues.sapPmNumber,

          productClassificationKey:

            previewEditableValues.productClassificationKey,

          productSpareService:

            previewEditableValues.productSpareService,

          materialCategories:

            previewEditableValues.materialCategories,

        },

        basicData: {

          baseUnit:

            previewEditableValues.baseUnit,

          materialType,

          industrySector:

            materialData.industrySector,

          materialGroup:

            previewEditableValues.materialGroup,

          externalMaterialGroup:

            previewEditableValues.externalMaterialGroup,

          oldMaterialNumber:

            previewEditableValues.oldMaterialNumber,

          division:

            previewEditableValues.division,

          netWeight:

            previewEditableValues.netWeight,

          grossWeight:

            previewEditableValues.grossWeight,

          weightUnit:

            materialData.weightUnit,

          eanUpc:

            previewEditableValues.eanUpc,

          eanCategory:

            previewEditableValues.eanCategory,

          descriptionEn:

            previewEditableValues.descriptionEn,

          descriptionOther:

            previewEditableValues.descriptionOther,

          transportationGroup:

            materialData.transportationGroup,

        },

        distributionChains: {

          salesOrganizations:

            selectedSalesOrganizations,

          distributionChain,

          itemCategoryGroup:

            previewEditableValues.itemCategoryGroup,

          materialGroup1:

            previewEditableValues.materialGroup1,

          materialGroup2:

            previewEditableValues.materialGroup2,

          materialGroup3:

            previewEditableValues.materialGroup3,

          materialGroup4:

            previewEditableValues.materialGroup4,

          materialGroup5:

            previewEditableValues.materialGroup5,

          taxm1:

            previewEditableValues.taxm1,

          taxm2:

            previewEditableValues.taxm2,

          taxm3:

            previewEditableValues.taxm3,

        },

        plants: {

          availabilityCheckGroup:

            previewEditableValues.availabilityCheckGroup,

          loadingGroup:

            previewEditableValues.loadingGroup,

          purchasingGroup:

            previewEditableValues.purchasingGroup,

          profitCenter:

            previewEditableValues.profitCenter,

          serialNumberProfile:

            previewEditableValues.serialNumberProfile,

          batchManagement:

            previewEditableValues.batchManagement,

          controlCode:

            previewEditableValues.controlCode,

          countryOfOrigin:

            previewEditableValues.countryOfOrigin,

          priceCode:

            previewEditableValues.priceCode,

          validFrom:

            previewEditableValues.validFrom,

          validTo:

            previewEditableValues.validTo,

          materialPrice:

            previewEditableValues.materialPrice,

          currency:

            previewEditableValues.currency,

          sourceListRequirement:

            previewEditableValues.sourceListRequirement,

        },

        valuationArea: {

          valuationClass,

        },

        msgSalesService: {

          marketingRelease: '99',

          countryRestriction:

            previewEditableValues.countryRestriction,

        },

      },

      submittedAt: new Date().toISOString(),

    }

    const existingRequests = JSON.parse(

      localStorage.getItem('materialRequests') || '[]',

    )

    const updatedRequests = [

      submittedRequest,

      ...existingRequests,

    ]

    localStorage.setItem(

      'materialRequests',

      JSON.stringify(updatedRequests),

    )

    setIsSubmitted(true)

    window.dispatchEvent(

      new Event('materialRequestSubmitted'),

    )

  }

  // =========================================

  // NORMAL CONTINUE

  // =========================================

  const handleContinue = () => {

    // STEP 2 → STEP 3

    if (

      currentStep === 2 &&

      crType &&

      countryOwner &&

      mcmn

    ) {

      setCurrentStep(3)

      return

    }

    // STEP 3 → STEP 4

    if (

      currentStep === 3 &&

      materialType

    ) {

      setCurrentStep(4)

      return

    }

    // STEP 4 → STEP 5

    if (

      currentStep === 4 &&

      businessTypes.length > 0 &&

      division

    ) {

      setCurrentStep(5)

      return

    }

    // STEP 5 → STEP 6

    if (

      currentStep === 5 &&

      description.trim() &&

      materialCategory

    ) {

      setCurrentStep(6)

      return

    }

    // STEP 6 → STEP 7

    if (

      currentStep === 6 &&

      selectedSalesOrganizations.length > 0 &&

      distributionChain

    ) {

      setCurrentStep(7)

      return

    }

  }

  // =========================================

  // STEP 7 → STEP 8

  // =========================================

  const handleStartValidation = () => {

    if (!valuationClass) {

      return

    }

    setCurrentStep(8)

  }

  // =========================================

  // STEP 8 → STEP 9

  //

  // IMPORTANT:

  // Build preview data FIRST.

  // Then move to Step 9.

  // =========================================

const handleContinueToPreview = () => {

  if (!validationComplete) {

    return

  }

  const previewValues = buildPreviewValues({

    materialType,

    division,

    description,

    translatedDescription,

    loadingGroup,

    purchasingGroup,

  })

  setPreviewEditableValues(previewValues)

  setPreviewInitialized(true)

  setCurrentStep(9)

}

  // =========================================

  // BACK

  // =========================================

  const handleBack = () => {

    if (currentStep > 1) {

      setCurrentStep(currentStep - 1)

    }

  }

  // =========================================

  // CONTINUE BUTTON DISABLED

  // =========================================

  const isContinueDisabled =

    (currentStep === 2 &&

      (!crType ||

        !countryOwner ||

        !mcmn)) ||

    (currentStep === 3 &&

      !materialType) ||

    (currentStep === 4 &&

      (businessTypes.length === 0 ||

        !division)) ||

    (currentStep === 5 &&

      (!description.trim() ||

        !materialCategory)) ||

    (currentStep === 6 &&

      (selectedSalesOrganizations.length === 0 ||

        !distributionChain))

  return (

    <div className="min-h-screen bg-slate-50">

      <Header onNewRequest={handleNewRequest} />

      <main className="w-full">

        <div className="flex flex-col md:flex-row lg:items-start">

          {/* =================================================

              SIDEBAR

          ================================================= */}

          <ProgressSidebar

            currentStep={currentStep}

            onStepClick={setCurrentStep}

          />

          {/* =================================================

              MAIN CONTENT

          ================================================= */}

          <section className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 xl:px-12">

            <div className="mx-auto w-full max-w-4xl">

              {/* =================================================

                  STEP 1

              ================================================= */}

              {currentStep === 1 && (

                <StartRequest

                  onStart={handleStartRequest}

                />

              )}

              {/* =================================================

                  STEP 2

              ================================================= */}

              {currentStep === 2 && (

                <>

                  <RequestSetupForm

                    requestorGid={requestorGid}

                    requestorEmail={requestorEmail}

                    crType={crType}

                    countryOwner={countryOwner}

                    mcmn={mcmn}

                    onCrTypeChange={setCrType}

                    onCountryChange={setCountryOwner}

                    onMcmnChange={setMcmn}

                  />

                  <NavigationButtons

                    onBack={handleBack}

                    onContinue={handleContinue}

                    disabled={isContinueDisabled}

                  />

                </>

              )}

              {/* =================================================

                  STEP 3

              ================================================= */}

              {currentStep === 3 && (

                <>

                  <MaterialTypeSelector

                    selectedValue={materialType}

                    onSelect={setMaterialType}

                  />

                  <NavigationButtons

                    onBack={handleBack}

                    onContinue={handleContinue}

                    disabled={isContinueDisabled}

                  />

                </>

              )}

              {/* =================================================

                  STEP 4

              ================================================= */}

              {currentStep === 4 && (

                <>

                  <QuestionCard

                    question="What type of business do you want to assign?"

                    description="Select one or more business types that apply to this material."

                    options={businessTypeOptions}

                    selectedValue={businessTypes}

                    onSelect={setBusinessTypes}

                    multiple

                  />

                  <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                    <div className="mb-5">

                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">

                        Division

                      </p>

                      <h3 className="mt-1 text-base font-semibold text-slate-900 sm:text-lg">

                        Select Division

                      </h3>

                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                      <span className="shrink-0 text-sm font-medium text-slate-600">

                        Select Division

                      </span>

                      <select

                        value={division}

                        onChange={(event) =>

                          setDivision(event.target.value)

                        }

                        className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 sm:w-44 sm:text-base"

                      >

                        <option value="">

                          Select

                        </option>

                        <option value="02">

                          02

                        </option>

                      </select>

                      {division === '02' && (

                        <span className="text-sm font-semibold text-slate-700 sm:text-base">

                          MR

                        </span>

                      )}

                    </div>

                  </div>

                  <NavigationButtons

                    onBack={handleBack}

                    onContinue={handleContinue}

                    disabled={isContinueDisabled}

                  />

                </>

              )}

              {/* =================================================

                  STEP 5

              ================================================= */}

              {currentStep === 5 && (

                <div>

                  <div className="mb-7 sm:mb-8">

                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">

                      Question

                    </p>

                    <h2 className="max-w-3xl text-xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">

                      What is the short description of the material?

                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">

                      Enter a clear English description for your

                      material. Keep it concise and meaningful.

                    </p>

                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">

                    <div className="space-y-6">

                      <TextInput

                        label="English description"

                        value={description}

                        onChange={(event) =>

                          setDescription(event.target.value)

                        }

                        placeholder="Enter material description"

                        maxLength={40}

                        helperText="Maximum 40 characters."

                      />

                      <LanguageSelect

                        value={additionalLanguage}

                        onChange={setAdditionalLanguage}

                      />

                      {additionalLanguage &&

                        description.trim() && (

                          <div className="border-t border-slate-100 pt-6">

                            <div className="mb-2 flex items-center justify-between gap-4">

                              <label className="text-sm font-semibold text-slate-900 sm:text-base">

                                {additionalLanguage === 'DE' &&

                                  'German description'}

                                {additionalLanguage === 'FR' &&

                                  'French description'}

                                {additionalLanguage === 'ES' &&

                                  'Spanish description'}

                                {additionalLanguage === 'IT' &&

                                  'Italian description'}

                              </label>

                              <span className="shrink-0 text-xs font-medium text-slate-400">

                                Auto-derived

                              </span>

                            </div>

                            <div className="min-h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 sm:min-h-14 sm:px-5 sm:py-4 sm:text-base">

                              {translatedDescription}

                            </div>

                            <p className="mt-2 text-xs leading-5 text-slate-400">

                              The translated description is automatically

                              derived from the English description.

                            </p>

                          </div>

                        )}

                      <div className="border-t border-slate-100 pt-6">

                        <div className="mb-3">

                          <label

                            htmlFor="material-category"

                            className="block text-sm font-semibold text-slate-900 sm:text-base"

                          >

                            Material Category

                          </label>

                          <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">

                            Select the material category from the available

                            values.

                          </p>

                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                          <select

                            id="material-category"

                            value={materialCategory}

                            onChange={(event) =>

                              setMaterialCategory(event.target.value)

                            }

                            className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 sm:w-36 sm:text-base"

                          >

                            <option value="">

                              Select

                            </option>

                            <option value="EQ">

                              EQ

                            </option>

                          </select>

                          {materialCategory === 'EQ' && (

                            <span className="text-sm font-semibold text-slate-700 sm:text-base">

                              Equipment

                            </span>

                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                  <NavigationButtons

                    onBack={handleBack}

                    onContinue={handleContinue}

                    disabled={isContinueDisabled}

                  />

                </div>

              )}

              {/* =================================================

                  STEP 6

              ================================================= */}

              {currentStep === 6 && (

                <>

                  <DistributionDetails

                    selectedSalesOrganizations={

                      selectedSalesOrganizations

                    }

                    onSalesOrganizationsChange={

                      setSelectedSalesOrganizations

                    }

                    distributionChain={distributionChain}

                    onDistributionChainChange={

                      setDistributionChain

                    }

                    additionalInformation={

                      additionalInformation

                    }

                    onAdditionalInformationChange={

                      setAdditionalInformation

                    }

                    materialType={materialType}

                    loadingGroup={loadingGroup}

                    onLoadingGroupChange={

                      setLoadingGroup

                    }

                    purchasingGroup={purchasingGroup}

                    onPurchasingGroupChange={

                      setPurchasingGroup

                    }

                  />

                  <NavigationButtons

                    onBack={handleBack}

                    onContinue={handleContinue}

                    disabled={isContinueDisabled}

                  />

                </>

              )}

              {/* =================================================

                  STEP 7 — VALUATION

              ================================================= */}

              {currentStep === 7 && (

                <>

                  <ValuationDetails

                    valuationClass={valuationClass}

                    onValuationClassChange={

                      setValuationClass

                    }

                  />

                  <NavigationButtons

                    onBack={handleBack}

                    onContinue={

                      handleStartValidation

                    }

                    continueLabel="Validation / Evaluation"

                    disabled={!valuationClass}

                  />

                </>

              )}

              {/* =================================================

                  STEP 8 — VALIDATION

              ================================================= */}

              {currentStep === 8 && (

                <div>

                  <div className="mb-7 sm:mb-8">

                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">

                      Validation / Evaluation

                    </p>

                    <h2 className="max-w-3xl text-xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">

                      Validating your material request

                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">

                      The request is being evaluated and the required

                      derivations are being prepared for the CR preview.

                    </p>

                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                    <div className="flex items-center gap-4">

                      <div

                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold ${

                          validationComplete

                            ? 'bg-slate-900 text-white'

                            : 'bg-slate-100 text-slate-600'

                        }`}

                      >

                        {validationComplete

                          ? '✓'

                          : '↻'}

                      </div>

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">

                          {validationComplete

                            ? 'Complete'

                            : 'In Progress'}

                        </p>

                        <h3 className="mt-1 text-lg font-semibold text-slate-900">

                          {validationComplete

                            ? 'Validation completed'

                            : 'Validation in progress'}

                        </h3>

                      </div>

                    </div>

                    <div className="mt-8">

                      <div className="mb-2 flex items-center justify-between">

                        <span className="text-xs font-medium text-slate-500">

                          Progress

                        </span>

                        <span className="text-xs font-semibold text-slate-700">

                          {Math.round(

                            (validationProgress /

                              validationChecks.length) *

                              100,

                          )}

                          %

                        </span>

                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                        <div

                          className="h-full rounded-full bg-slate-900 transition-all duration-500"

                          style={{

                            width: `${

                              (validationProgress /

                                validationChecks.length) *

                              100

                            }%`,

                          }}

                        />

                      </div>

                    </div>

                    <div className="mt-8 space-y-4">

                      {validationChecks.map(

                        (check, index) => {

                          const completed =

                            validationProgress > index

                          return (

                            <div

                              key={check}

                              className="flex items-center gap-3"

                            >

                              <div

                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${

                                  completed

                                    ? 'bg-slate-900 text-white'

                                    : 'bg-slate-100 text-slate-400'

                                }`}

                              >

                                {completed

                                  ? '✓'

                                  : index + 1}

                              </div>

                              <span

                                className={`text-sm ${

                                  completed

                                    ? 'font-medium text-slate-900'

                                    : 'text-slate-500'

                                }`}

                              >

                                {check}

                              </span>

                            </div>

                          )

                        },

                      )}

                    </div>

                    {validationComplete && (

                      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">

                        <p className="text-sm font-semibold text-slate-900">

                          Validation and derivation completed.

                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-500">

                          Your material request is ready for preview.

                        </p>

                      </div>

                    )}

                  </div>

                  <NavigationButtons

                    onBack={handleBack}

                    onContinue={

                      handleContinueToPreview

                    }

                    continueLabel="Continue to Preview"

                    disabled={!validationComplete}

                  />

                </div>

              )}

              {/* =================================================

                  STEP 9 — CR PREVIEW

              ================================================= */}

              {currentStep === 9 && (

                <>

                  {!isSubmitted ? (

                    <>

                      <ReviewRequest

                        requestorGid={

                          requestorGid

                        }

                        requestorEmail={

                          requestorEmail

                        }

                        crType={crType}

                        countryOwner={

                          countryOwner

                        }

                        materialType={

                          materialType

                        }

                        businessTypes={

                          businessTypes

                        }

                        division={

                          division

                        }

                        description={

                          description

                        }

                        additionalLanguage={

                          additionalLanguage

                        }

                        translatedDescription={

                          translatedDescription

                        }

                        selectedSalesOrganizations={

                          selectedSalesOrganizations

                        }

                        distributionChain={

                          distributionChain

                        }

                        loadingGroup={

                          loadingGroup

                        }

                        purchasingGroup={

                          purchasingGroup

                        }

                        valuationClass={

                          valuationClass

                        }

                        editableValues={

                          previewEditableValues

                        }

                        onEditableChange={

                          handlePreviewEdit

                        }

                      />

                      <NavigationButtons

                        onBack={handleBack}

                        onContinue={

                          handleSubmit

                        }

                        continueLabel="Approve & Submit"

                        disabled={false}

                      />

                    </>

                  ) : (

                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">

                      <div className="flex flex-col items-center text-center">

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-xl font-semibold text-white">

                          ✓

                        </div>

                        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-slate-400">

                          Submitted

                        </p>

                        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">

                          Request submitted successfully

                        </h2>

                        <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">

                          Your material request has been submitted successfully.

                          The request is now ready for further processing.

                        </p>

                      </div>

                    </div>

                  )}

                </>

              )}

            </div>

          </section>

        </div>

      </main>

    </div>

  )

}

export default App