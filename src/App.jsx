import { useState } from 'react'
import Header from './components/Header'
import ProgressSidebar from './components/ProgressSidebar'
import QuestionCard from './components/QuestionCard'
import NavigationButtons from './components/NavigationButtons'
import TextInput from './components/TextInput'
import LanguageSelect from './components/LanguageSelect'
import DistributionDetails from './components/DistributionDetails'
import ReviewRequest from './components/ReviewRequest'
import StartRequest from './components/StartRequest'

import {
  materialTypeOptions,
  businessTypeOptions,
} from './data/questions'

import { translateDescription } from './data/translation'

function App() {
  const [currentStep, setCurrentStep] = useState(1)

  const [isSubmitted, setIsSubmitted] = useState(false)

  // Step 2 — Material Type
  const [materialType, setMaterialType] = useState('')

  // Step 3 — Business Type
  const [businessTypes, setBusinessTypes] = useState([])

  // Step 4 — Material Description
  const [description, setDescription] = useState('')
  const [additionalLanguage, setAdditionalLanguage] = useState('')

  // Step 5 — Distribution Details
  const [selectedSalesOrganizations, setSelectedSalesOrganizations] =
    useState([])

  const [distributionChain, setDistributionChain] = useState('')

  const [additionalInformation, setAdditionalInformation] =
    useState('')

  const [loadingGroup, setLoadingGroup] = useState('')

  const [purchasingGroup, setPurchasingGroup] = useState('')

  // Translation
  const translatedDescription = translateDescription(
    description,
    additionalLanguage
  )

  // =========================================
  // STEP 1 — START REQUEST
  // =========================================

  const handleStartRequest = () => {
    setCurrentStep(2)
  }

  const handleSubmit = () => {
  setIsSubmitted(true)
  }

  // =========================================
  // CONTINUE
  // =========================================

  const handleContinue = () => {
    // Step 2 → Step 3
    if (currentStep === 2 && materialType) {
      setCurrentStep(3)
      return
    }

    // Step 3 → Step 4
    if (currentStep === 3 && businessTypes.length > 0) {
      setCurrentStep(4)
      return
    }

    // Step 4 → Step 5
    if (currentStep === 4 && description.trim()) {
      setCurrentStep(5)
      return
    }

    // Step 5 → Step 6
    if (
      currentStep === 5 &&
      selectedSalesOrganizations.length > 0 &&
      distributionChain
    ) {
      setCurrentStep(6)
      return
    }
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
  // CONTINUE BUTTON VALIDATION
  // =========================================

  const isContinueDisabled =
    (currentStep === 2 && !materialType) ||
    (currentStep === 3 && businessTypes.length === 0) ||
    (currentStep === 4 && !description.trim()) ||
    (currentStep === 5 &&
      (selectedSalesOrganizations.length === 0 ||
        !distributionChain))

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 xl:px-12">
        <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-start">

          {/* ========================================= */}
          {/* SIDEBAR */}
          {/* ========================================= */}

          <ProgressSidebar currentStep={currentStep} />

          {/* ========================================= */}
          {/* MAIN CONTENT */}
          {/* ========================================= */}

          <section className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-4xl lg:mx-0">

              {/* ========================================= */}
              {/* STEP 1 — START REQUEST */}
              {/* ========================================= */}

              {currentStep === 1 && (
                <StartRequest
                  onStart={handleStartRequest}
                />
              )}

              {/* ========================================= */}
              {/* STEP 2 — MATERIAL TYPE */}
              {/* ========================================= */}

              {currentStep === 2 && (
                <>
                  <QuestionCard
                    question="What type of material do you want to create?"
                    description="Select the material type that best matches your request. We'll use your selection to determine the relevant material data."
                    options={materialTypeOptions}
                    selectedValue={materialType}
                    onSelect={setMaterialType}
                  />

                  <NavigationButtons
                    onBack={() => setCurrentStep(1)}
                    onContinue={handleContinue}
                    disabled={isContinueDisabled}
                  />
                </>
              )}

              {/* ========================================= */}
              {/* STEP 3 — BUSINESS TYPE */}
              {/* ========================================= */}

              {currentStep === 3 && (
                <>
                  <QuestionCard
                    question="What type of business do you want to assign?"
                    description="Select one or more business types that apply to this material."
                    options={businessTypeOptions}
                    selectedValue={businessTypes}
                    onSelect={setBusinessTypes}
                    multiple
                  />

                  <NavigationButtons
                    onBack={handleBack}
                    onContinue={handleContinue}
                    disabled={isContinueDisabled}
                  />
                </>
              )}

              {/* ========================================= */}
              {/* STEP 4 — MATERIAL DESCRIPTION */}
              {/* ========================================= */}

              {currentStep === 4 && (
                <div>

                  {/* Question Header */}
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

                  {/* Input Card */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
                    <div className="space-y-6">

                      {/* English Description */}
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

                      {/* Additional Language */}
                      <LanguageSelect
                        value={additionalLanguage}
                        onChange={setAdditionalLanguage}
                      />

                      {/* Translated Description */}
                      {additionalLanguage && description.trim() && (
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
                              Auto-translated
                            </span>
                          </div>

                          <div className="min-h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 sm:min-h-14 sm:px-5 sm:py-4 sm:text-base">
                            {translatedDescription}
                          </div>

                          <p className="mt-2 text-xs leading-5 text-slate-400">
                            The translated description is generated from
                            the English description.
                          </p>

                        </div>
                      )}

                    </div>
                  </div>

                  {/* Navigation */}
                  <NavigationButtons
                    onBack={handleBack}
                    onContinue={handleContinue}
                    disabled={isContinueDisabled}
                  />

                </div>
              )}

              {/* ========================================= */}
              {/* STEP 5 — DISTRIBUTION DETAILS */}
              {/* ========================================= */}

              {currentStep === 5 && (
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
                    onLoadingGroupChange={setLoadingGroup}
                    purchasingGroup={purchasingGroup}
                    onPurchasingGroupChange={setPurchasingGroup}
                  />

                  <NavigationButtons
                    onBack={handleBack}
                    onContinue={handleContinue}
                    disabled={isContinueDisabled}
                  />
                </>
              )}

              {/* ========================================= */}
              {/* STEP 6 — CR PREVIEW / REVIEW */}
              {/* ========================================= */}
              {currentStep === 6 && (
                <>
                  {!isSubmitted ? (
                    <>
                      <ReviewRequest
                        materialType={materialType}
                        businessTypes={businessTypes}
                        description={description}
                        additionalLanguage={additionalLanguage}
                        translatedDescription={translatedDescription}
                        selectedSalesOrganizations={
                          selectedSalesOrganizations
                        }
                        distributionChain={distributionChain}
                        additionalInformation={additionalInformation}
                        loadingGroup={loadingGroup}
                        purchasingGroup={purchasingGroup}
                      />

                      <NavigationButtons
                        onBack={handleBack}
                        onContinue={handleSubmit}
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