import { useState } from 'react'
import { motion } from 'framer-motion'

/* =========================================================
   PREVIEW FIELD
========================================================= */

const PreviewField = ({
  fieldKey,
  label,
  technicalField,
  value,
  source,
  status,
  required = false,
  onChange,
}) => {
  const isChangeable = status === 'Changeable'

  const [isEditing, setIsEditing] = useState(false)

  const hasValue =
    value !== undefined &&
    value !== null &&
    String(value).trim() !== ''

  const displayValue = hasValue
    ? value
    : 'Enter / select value'

  const handleEditToggle = () => {
    setIsEditing((previous) => !previous)
  }

  const handleChange = (event) => {
    onChange?.(event.target.value)
  }

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <div className="grid gap-4 p-4 sm:grid-cols-[1.35fr_1.65fr_1.1fr_auto] sm:items-center sm:gap-5 sm:p-5">

        {/* =================================================
            CR FIELD
        ================================================= */}

        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-800">
            {label}

            {required && (
              <span className="ml-1 text-red-500">
                *
              </span>
            )}
          </p>

          {technicalField && (
            <p className="mt-1 text-[11px] font-medium tracking-wide text-slate-400">
              {technicalField}
            </p>
          )}
        </div>

        {/* =================================================
            VALUE
        ================================================= */}

        <div className="min-w-0">

          {/* ===============================================
              BLOCKED
          =============================================== */}

          {!isChangeable && (
            <div className="min-h-11 rounded-xl bg-slate-50 px-3 py-2.5">
              <p className="break-words text-sm font-medium text-slate-700">
                {hasValue ? value : '—'}
              </p>
            </div>
          )}

          {/* ===============================================
              CHANGEABLE — VIEW MODE
          =============================================== */}

          {isChangeable && !isEditing && (
            <div
              className={`min-h-11 rounded-xl border px-3 py-2.5 ${
                hasValue
                  ? 'border-slate-200 bg-slate-50'
                  : 'border-dashed border-slate-300 bg-slate-50/70'
              }`}
            >
              <p
                className={`break-words text-sm font-medium ${
                  hasValue
                    ? 'text-slate-700'
                    : 'italic text-slate-400'
                }`}
              >
                {displayValue}
              </p>
            </div>
          )}

          {/* ===============================================
              CHANGEABLE — EDIT MODE
          =============================================== */}

          {isChangeable && isEditing && (
            <input
              type="text"
              value={value ?? ''}
              onChange={handleChange}
              autoFocus
              placeholder={
                required
                  ? 'Enter / select value *'
                  : 'Enter / select value'
              }
              className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
            />
          )}

        </div>

        {/* =================================================
            SOURCE
        ================================================= */}

        <div className="min-w-0">

          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:hidden">
            Source
          </p>

          <p className="break-words text-xs font-medium leading-5 text-slate-500 sm:text-sm">
            {source}
          </p>

        </div>

        {/* =================================================
            STATUS / EDIT BUTTON
        ================================================= */}

        <div className="flex items-center">

          {/* ===============================================
              BLOCKED
          =============================================== */}

          {status === 'Blocked' && (
            <span className="whitespace-nowrap text-sm font-semibold text-red-600">
              Blocked
            </span>
          )}

          {/* ===============================================
              CHANGEABLE
          =============================================== */}

          {status === 'Changeable' && (
            <button
              type="button"
              onClick={handleEditToggle}
              aria-label={
                isEditing
                  ? `Finish editing ${label}`
                  : `Edit ${label}`
              }
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                isEditing
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {isEditing
                ? 'Done'
                : 'Changeable'}
            </button>
          )}

        </div>

      </div>
    </div>
  )
}

/* =========================================================
   SECTION CARD
========================================================= */

const SectionCard = ({
  title,
  children,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* SECTION HEADER */}

      <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-6">
        <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
          {title}
        </h3>
      </div>

      {/* DESKTOP COLUMN HEADERS */}

      <div className="hidden border-b border-slate-200 bg-white sm:grid sm:grid-cols-[1.35fr_1.65fr_1.1fr_auto] sm:gap-5 sm:px-5 sm:py-3">

        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          CR Field
        </p>

        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Value
        </p>

        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Source
        </p>

        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Status
        </p>

      </div>

      {children}

    </div>
  )
}

/* =========================================================
   REVIEW REQUEST
========================================================= */

const ReviewRequest = ({
  requestorGid = '',
  requestorEmail = '',
  crType = '',
  countryOwner = '',
  materialType = '',
  division = '',
  description = '',
  additionalLanguage = '',
  translatedDescription = '',
  selectedSalesOrganizations = [],
  distributionChain = '',
  loadingGroup = '',
  purchasingGroup = '',
  valuationClass = '',

  editableValues = {},

  onEditableChange,
}) => {

  /* =======================================================
     ACTIVE PREVIEW SECTION
  ======================================================= */

  const [activeSection, setActiveSection] =
    useState('general')

  /* =======================================================
     LANGUAGE
  ======================================================= */

  const languageNames = {
    DE: 'German',
    FR: 'French',
    ES: 'Spanish',
    IT: 'Italian',
  }

  const languageName =
    languageNames[additionalLanguage] ||
    additionalLanguage

  /* =======================================================
     MATERIAL TYPE DERIVED DATA
  ======================================================= */

  const materialTypeData = {
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

  const currentMaterial =
    materialTypeData[materialType] ||
    materialTypeData.ZLDI

  /* =======================================================
     SALES ORGANIZATION NORMALIZATION
  ======================================================= */

  const getSalesOrgValue = (salesOrg) => {
    if (typeof salesOrg === 'string') {
      return salesOrg
    }

    if (typeof salesOrg === 'number') {
      return String(salesOrg)
    }

    if (
      salesOrg &&
      typeof salesOrg === 'object'
    ) {
      const possibleValue =
        salesOrg.value ??
        salesOrg.salesOrg ??
        salesOrg.code ??
        salesOrg.id ??
        ''

      return String(possibleValue)
    }

    return ''
  }

  const normalizedSalesOrganizations =
    Array.isArray(selectedSalesOrganizations)
      ? selectedSalesOrganizations
          .map(getSalesOrgValue)
          .filter(Boolean)
      : []

  /* =======================================================
     POC PLANT DERIVATION
  ======================================================= */

  const derivedPlants =
    normalizedSalesOrganizations.length > 0
      ? normalizedSalesOrganizations.map(
          (salesOrg) => ({
            salesOrg,
            plant: `PLANT-${salesOrg.slice(-2)}`,
          }),
        )
      : []

  /* =======================================================
     PREVIEW TABS
  ======================================================= */

  const sections = [
    {
      id: 'general',
      label: 'General Data',
    },
    {
      id: 'localMaterials',
      label: 'Local Materials Extended Basic',
    },
    {
      id: 'basic',
      label: 'Basic Data',
    },
    {
      id: 'distribution',
      label: 'Distribution Chains',
    },
    {
      id: 'plants',
      label: 'Plants',
    },
    {
      id: 'valuation',
      label: 'Valuation Area',
    },
    {
      id: 'msg',
      label: 'MSG Sales & Service',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >

      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <div className="mb-7 sm:mb-8">

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          CR Preview
        </p>

        <h2 className="max-w-4xl text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Please check the pre-defined content and edit/add content to CR
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
          Review the generated Change Request data before approval.
        </p>

      </div>

      {/* ===================================================
          PREVIEW TABS
      =================================================== */}

      <div className="mb-6 overflow-x-auto">

        <div className="flex min-w-max gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">

          {sections.map((section) => {

            const isActive =
              activeSection === section.id

            return (
              <button
                key={section.id}
                type="button"
                onClick={() =>
                  setActiveSection(section.id)
                }
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {section.label}
              </button>
            )
          })}

        </div>
      </div>

      {/* ===================================================
          GENERAL DATA
      =================================================== */}

      {activeSection === 'general' && (
        <SectionCard title="General Data">

          <PreviewField
            fieldKey="crOwner"
            label="NAME – CR Owner"
            technicalField="CR Owner"
            value={
              requestorGid && requestorEmail
                ? `${requestorGid} – ${requestorEmail}`
                : requestorGid ||
                  requestorEmail
            }
            source="by LOGIN Data"
            status="Blocked"
          />

          <PreviewField
            fieldKey="crType"
            label="TYPE of Change Request"
            value={crType}
            source="Chatbot Select"
            status="Blocked"
          />

          <PreviewField
            fieldKey="creationDate"
            label="CREATION Date"
            value={new Date().toLocaleDateString(
              'en-GB',
            )}
            source="by System"
            status="Blocked"
          />

          <PreviewField
            fieldKey="crNumber"
            label="CR – Number"
            technicalField="Technical Placeholder"
            value="To be generated by System"
            source="By System"
            status="Blocked"
          />

        </SectionCard>
      )}

      {/* ===================================================
          LOCAL MATERIALS EXTENDED BASIC
      =================================================== */}

      {activeSection === 'localMaterials' && (
        <SectionCard title="Local Materials Extended Basic">

          <PreviewField
            fieldKey="countryOwner"
            label="COUNTRY Owner"
            value={countryOwner}
            source="Chatbot Select"
            status="Blocked"
          />

          <PreviewField
            fieldKey="marketingRelease"
            label="MARKETING Release"
            value={
              editableValues.marketingRelease
            }
            source="Auto-Derive"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'marketingRelease',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="businessUnit"
            label="BUSINESS UNIT (GG)"
            value={
              editableValues.businessUnit
            }
            source="CR-Select*"
            status="Changeable"
            required
            onChange={(value) =>
              onEditableChange(
                'businessUnit',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="businessSegment"
            label="BUSINESS SEGMENT (GS)"
            value={
              editableValues.businessSegment
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'businessSegment',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="businessLine"
            label="BUSINESS LINE (GZ)"
            value={
              editableValues.businessLine
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'businessLine',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="locOemWarranty"
            label="LOC OEM WARRANTY flag"
            value="Auto-derived"
            source="Auto-Derive"
            status="Blocked"
          />

          <PreviewField
            fieldKey="sapPmNumber"
            label="SAP PM Number"
            value={
              editableValues.sapPmNumber
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'sapPmNumber',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="productClassificationKey"
            label="PRODUCT Classification Key"
            value={
              editableValues.productClassificationKey
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'productClassificationKey',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="productSpareService"
            label="PRODUCT/SPARE/SERVICE"
            value={
              editableValues.productSpareService
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'productSpareService',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="materialCategories"
            label="CATEGORIES for materials"
            value={
              editableValues.materialCategories
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'materialCategories',
                value,
              )
            }
          />

        </SectionCard>
      )}

      {/* ===================================================
          BASIC DATA
      =================================================== */}

      {activeSection === 'basic' && (
        <SectionCard title="Basic Data">

          <PreviewField
            fieldKey="baseUnit"
            label="BASE UNIT of measure"
            technicalField="BUOM"
            value={
              editableValues.baseUnit ||
              currentMaterial.baseUnit
            }
            source="Auto-Derive"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'baseUnit',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="materialType"
            label="MATERIAL Type"
            value={materialType}
            source="Chatbot Select"
            status="Blocked"
          />

          <PreviewField
            fieldKey="industrySector"
            label="INDUSTRY Sector"
            technicalField="MBRSH"
            value={
              currentMaterial.industrySector
            }
            source="Auto-Derive"
            status="Blocked"
          />

          <PreviewField
            fieldKey="materialGroup"
            label="MATERIAL Group (ESN)"
            technicalField="MATKL"
            value={
              editableValues.materialGroup ||
              currentMaterial.materialGroup
            }
            source="Auto-Derive"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'materialGroup',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="externalMaterialGroup"
            label="EXTERNAL material group"
            technicalField="EXTWG"
            value={
              editableValues.externalMaterialGroup
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'externalMaterialGroup',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="genericItemGroupCategory"
            label="GENERIC Item group category"
            technicalField="MTPOS"
            value={
              currentMaterial.genericItemGroupCategory
            }
            source="Auto-Derive"
            status="Blocked"
          />

          <PreviewField
            fieldKey="oldMaterialNumber"
            label="OLD Material number"
            value={
              editableValues.oldMaterialNumber
            }
            source="CR-SELECT"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'oldMaterialNumber',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="division"
            label="DIVISION"
            value={
              editableValues.division ||
              division
            }
            source="Chatbot-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'division',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="netWeight"
            label="NET Weight"
            technicalField="NTGEW"
            value={
              editableValues.netWeight ||
              currentMaterial.netWeight
            }
            source="Auto-Derive"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'netWeight',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="grossWeight"
            label="GROSS Weight"
            technicalField="BRGEW"
            value={
              editableValues.grossWeight ||
              currentMaterial.grossWeight
            }
            source="Auto-Derive"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'grossWeight',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="weightUnit"
            label="WEIGHT Unit"
            technicalField="GEWEI"
            value={
              currentMaterial.weightUnit
            }
            source="Auto-Derive"
            status="Blocked"
          />

          <PreviewField
            fieldKey="eanUpc"
            label="EAN/UPC"
            value={editableValues.eanUpc}
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'eanUpc',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="eanCategory"
            label="EAN Category"
            value={editableValues.eanCategory}
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'eanCategory',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="descriptionEn"
            label="DESCRIPTION EN"
            value={
              editableValues.descriptionEn ||
              description
            }
            source="Chatbot-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'descriptionEn',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="descriptionOther"
            label={
              additionalLanguage
                ? `DESCRIPTION (${languageName})`
                : 'DESCRIPTION (other)'
            }
            value={
              editableValues.descriptionOther ||
              translatedDescription
            }
            source="Chatbot-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'descriptionOther',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="transportationGroup"
            label="TRANSPORTATION group (ZLHW, ZLVP)"
            technicalField="MARA_TRAGR"
            value={
              currentMaterial.transportationGroup
            }
            source="Auto-Derive"
            status="Blocked"
          />

        </SectionCard>
      )}

      {/* ===================================================
          DISTRIBUTION CHAINS
      =================================================== */}

      {activeSection === 'distribution' && (
        <SectionCard title="Distribution Chains">

          <PreviewField
            fieldKey="salesOrganizations"
            label="SALESOrg"
            value={
              normalizedSalesOrganizations.length > 0
                ? normalizedSalesOrganizations.join(', ')
                : ''
            }
            source="Chatbot-Select"
            status="Blocked"
          />

          <PreviewField
            fieldKey="distributionChain"
            label="Distribution Chain"
            value={distributionChain}
            source="Chatbot-Select"
            status="Blocked"
          />

          <PreviewField
            fieldKey="deliveringPlant"
            label="DELIVERING Plant"
            technicalField="MARC_WERKS"
            value={
              derivedPlants.length > 0
                ? derivedPlants
                    .map((item) => item.plant)
                    .join(', ')
                : ''
            }
            source="Auto-Derive"
            status="Blocked"
          />

          <PreviewField
            fieldKey="cashDiscount"
            label="CASH-Discount"
            value="Auto-derived"
            source="Auto-Derive"
            status="Blocked"
          />

          <PreviewField
            fieldKey="accountingAssignmentGroup"
            label="ACCOUNTING Assignment Group"
            value="Auto-derived"
            source="Auto-Derive"
            status="Blocked"
          />

          <PreviewField
            fieldKey="itemCategoryGroup"
            label="Item Category Group"
            value={
              editableValues.itemCategoryGroup ||
              'ZLES'
            }
            source="Chatbot-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'itemCategoryGroup',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="materialGroup1"
            label="MATERIAL Group 1"
            technicalField="MVKE_MVGR1"
            value={
              editableValues.materialGroup1
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'materialGroup1',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="materialGroup2"
            label="MATERIAL Group 2"
            technicalField="MVKE_MVGR2"
            value={
              editableValues.materialGroup2
            }
            source="Chatbot-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'materialGroup2',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="materialGroup3"
            label="MATERIAL Group 3"
            technicalField="MVKE_MVGR3"
            value={
              editableValues.materialGroup3
            }
            source="Chatbot-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'materialGroup3',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="materialGroup4"
            label="MATERIAL Group 1"
            technicalField="MVKE_MVGR4"
            value={
              editableValues.materialGroup4
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'materialGroup4',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="materialGroup5"
            label="MATERIAL Group 1"
            technicalField="MVKE_MVGR5"
            value={
              editableValues.materialGroup5
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'materialGroup5',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="taxm1"
            label="TAXM 1"
            value={editableValues.taxm1}
            source="Auto-Derive"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'taxm1',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="taxm2"
            label="TAXM 2"
            value={editableValues.taxm2}
            source="Auto-Derive"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'taxm2',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="taxm3"
            label="TAXM 3"
            value={editableValues.taxm3}
            source="Auto-Derive"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'taxm3',
                value,
              )
            }
          />

        </SectionCard>
      )}

      {/* ===================================================
          PLANTS
      =================================================== */}

      {activeSection === 'plants' && (
        <SectionCard title="Plants">

          <PreviewField
            fieldKey="plantData"
            label="PLANT Data"
            technicalField="MARC_WERKS"
            value={
              derivedPlants.length > 0
                ? derivedPlants
                    .map((item) => item.plant)
                    .join(', ')
                : ''
            }
            source="Auto-Derive"
            status="Blocked"
          />

          <PreviewField
            fieldKey="availabilityCheckGroup"
            label="AVAILABILITY Check Group"
            technicalField="MARC_MTVFP"
            value={
              editableValues.availabilityCheckGroup
            }
            source="Auto-Derive"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'availabilityCheckGroup',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="loadingGroup"
            label="LOADING Group"
            value={
              editableValues.loadingGroup ||
              loadingGroup ||
              (
                materialType === 'ZLHW' ||
                materialType === 'ZLVP'
              )
                ? editableValues.loadingGroup ||
                  loadingGroup ||
                  '0003'
                : ''
            }
            source="Chatbot-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'loadingGroup',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="purchasingGroup"
            label="PURCHASING Group"
            value={
              editableValues.purchasingGroup ||
              purchasingGroup ||
              'AU1'
            }
            source="Chatbot-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'purchasingGroup',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="automaticPurchaseOrder"
            label="AUTOMATIC Purchase Order"
            value="Auto-derived"
            source="Auto-Derive"
            status="Blocked"
          />

          <PreviewField
            fieldKey="costingLotSize"
            label="COSTING Lot Size"
            technicalField="MARC_LOSGR"
            value="1,000"
            source="Auto-Derive"
            status="Blocked"
          />

          <PreviewField
            fieldKey="materialOrigin"
            label="MATERIAL Origin"
            value="Auto-derived"
            source="Auto-Derive"
            status="Blocked"
          />

          <PreviewField
            fieldKey="profitCenter"
            label="PROFIT Center"
            value={editableValues.profitCenter}
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'profitCenter',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="serialNumberProfile"
            label="SERIAL Number Profile"
            value={
              editableValues.serialNumberProfile
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'serialNumberProfile',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="batchManagement"
            label="BATCH Management"
            value={
              editableValues.batchManagement
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'batchManagement',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="controlCode"
            label="CONTROL Code"
            value={
              editableValues.controlCode
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'controlCode',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="countryOfOrigin"
            label="COUNTRY of origin"
            value={
              editableValues.countryOfOrigin
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'countryOfOrigin',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="priceCode"
            label="PRICE Code"
            value={editableValues.priceCode}
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'priceCode',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="validFrom"
            label="VALID from"
            value={editableValues.validFrom}
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'validFrom',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="validTo"
            label="VALID to"
            value={editableValues.validTo}
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'validTo',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="materialPrice"
            label="MATERIAL Price"
            value={
              editableValues.materialPrice
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'materialPrice',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="currency"
            label="CURRENCY"
            value={
              editableValues.currency
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'currency',
                value,
              )
            }
          />

          <PreviewField
            fieldKey="sourceListRequirement"
            label="SOPURCE List requirement"
            value={
              editableValues.sourceListRequirement
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'sourceListRequirement',
                value,
              )
            }
          />

        </SectionCard>
      )}

      {/* ===================================================
          VALUATION AREA
      =================================================== */}

      {activeSection === 'valuation' && (
        <SectionCard title="Valuation Area">

          <PreviewField
            fieldKey="valuationClass"
            label="VALUATION Class"
            technicalField="MBEW_BKLAS"
            value={valuationClass}
            source="Chatbot-Select"
            status="Blocked"
          />

        </SectionCard>
      )}

      {/* ===================================================
          MSG SALES & SERVICE
      =================================================== */}

      {activeSection === 'msg' && (
        <SectionCard title="MSG Sales & Service">

          <PreviewField
            fieldKey="msgMarketingRelease"
            label="MARKETING Release"
            value="99"
            source="Auto-Derive"
            status="Blocked"
          />

          <PreviewField
            fieldKey="countryRestriction"
            label="COUNTRY Restriction"
            value={
              editableValues.countryRestriction
            }
            source="CR-Select"
            status="Changeable"
            onChange={(value) =>
              onEditableChange(
                'countryRestriction',
                value,
              )
            }
          />

        </SectionCard>
      )}

    </motion.div>
  )
}

export default ReviewRequest