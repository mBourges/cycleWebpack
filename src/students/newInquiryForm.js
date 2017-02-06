import xs from 'xstream';
import { form, h4, div, label, input } from '@cycle/dom';
import inputComponent from '../ui/input/field';

function newInquiryForm(sources) {
  const lastnameKanji = inputComponent(sources, xs.of({
    name: 'LastnameKanji',
    placeholder: '姓（漢字）'
  }));
  const firstnameKanji = inputComponent(sources, xs.of({
    name: 'FirstnameKanji',
    placeholder: '名（漢字）'
  }));
  const lastnameFurigana = inputComponent(sources, xs.of({
    name: 'LastnameFurigana',
    placeholder: '姓（ふり）'
  }));
  const firstnameFurigana = inputComponent(sources, xs.of({
    name: 'FirstnameFurigana',
    placeholder: '名（ふり）'
  }));

  const protectorLastnameKanji = inputComponent(sources, xs.of({
    name: 'Protector.LastnameKanji',
    placeholder: '姓（漢字）'
  }));
  const protectorFirstnameKanji = inputComponent(sources, xs.of({
    name: 'Protector.FirstnameKanji',
    placeholder: '名（漢字）'
  }));
  const protectorLastnameFurigana = inputComponent(sources, xs.of({
    name: 'Protector.LastnameFurigana',
    placeholder: '姓（ふり）'
  }));
  const protectorFirstnameFurigana = inputComponent(sources, xs.of({
    name: 'Protector.FirstnameFurigana',
    placeholder: '名（ふり）'
  }));

  const birthdateInput = inputComponent(sources, xs.of({
      name: 'BirthDate',
      type: 'date',
      required: true,
      placeholder: '生年月日'
    })
  );

  const component$ = xs.combine(
    lastnameKanji.DOM,
    firstnameKanji.DOM,
    lastnameFurigana.DOM,
    firstnameFurigana.DOM,
    birthdateInput.DOM,
    protectorLastnameKanji.DOM,
    protectorFirstnameKanji.DOM,
    protectorLastnameFurigana.DOM,
    protectorFirstnameFurigana.DOM
  ).map(([
    lastnameKanjiDOM,
    firstnameKanjiDOM,
    lastnameFuriganaDOM,
    firstnameFuriganaDOM,
    birthdateInputDOM,
    protectorLastnameKanjiDOM,
    protectorFirstnameKanjiDOM,
    protectorLastnameFuriganaDOM,
    protectorFirstnameFuriganaDOM
  ]) =>form('.ui.form', [
    div('.ui.stackable.two.column.grid', [
      div('.column', [
        h4('.ui.dividing.header', '生徒情報'),
        div('.field', [
          label('氏名（漢字）'),
          div('.two.fields', [
            div('.field', [
              firstnameKanjiDOM
            ]),
            div('.field', [
              lastnameKanjiDOM
            ])
          ])
        ]),
        div('.field', [
          label('氏名（ふり）'),
          div('.two.fields', [
            div('.field', [
              lastnameFuriganaDOM
            ]),
            div('.field', [
              firstnameFuriganaDOM
            ])
          ])
        ]),
  div('.two.fields', [
        div('.field', [
          label('生年月日'),
          birthdateInputDOM
        ]),

        div('.inline.fields', [
          label('性別'),
          div('.field', [
            div('.ui.radio.checkbox', [
              input({
                props: {
                  type: "radio",
                  name: "Gender",
                  checked: false
                },
                class: 'hidden'
              }),
              label('Male')
            ])
          ]),
          div('.field', [
            div('.ui.radio.checkbox', [
              input({
                props: {
                  type: "radio",
                  name: "Gender",
                  checked: false
                },
                class: 'hidden'
              }),
              label('Female')
            ])
          ])
        ])
])
      ]),
      div('.column', [
        h4('.ui.dividing.header', '保護者情報'),
        div('.field', [
          label('氏名（ふり）'),
          div('.two.fields', [
            div('.field', [
              protectorLastnameKanjiDOM
            ]),
            div('.field', [
              protectorFirstnameKanjiDOM
            ])
          ])
        ]),
        div('.field', [
          label('氏名（ふり）'),
          div('.two.fields', [
            div('.field', [
              protectorLastnameFuriganaDOM
            ]),
            div('.field', [
              protectorFirstnameFuriganaDOM
            ])
          ])
        ])
      ]),
      div('.one.column.row', [
        div('.column', [
          h4('.ui.dividing.header', '問合せ内容')
        ])
      ])
    ])
  ]));

  return {
    DOM: component$
  };
}

export default newInquiryForm;
//
//
// const InquiryCreate = ({inquiry, updateInquiry, save, cancel, isSaving}) => {
//   const handleGenderSelection = (value) => {
//     updateInquiry(value, {
//       target: { name: 'Gender' }
//     });
//   };
//
//   const handleContactMethod = (value) => {
//     updateInquiry(value, {
//       target: { name: 'Contents.0.ContactMethod' }
//     });
//   };
//
//   const handleBirthDate = (value) => {
//     updateInquiry(value, {
//       target: { name: 'BirthDate' }
//     });
//   };
//
//   const handleInquiryDate = (value) => {
//     updateInquiry(value, {
//       target: { name: 'InquiryDate' }
//     });
//   };
//
//   const handleSchoolYear = (value) => {
//     console.log(value);
//     updateInquiry(value, {
//       target: { name: 'SchoolYear' }
//     });
//   };
//
//   /*const handleSchool = (value, label) => {
//     updateInquiry(value, {
//       target: { name: 'School' }
//     });
//   };*/
//
//  /* const handleQuardSchool = (value) => {
//     console.log(value);
//     updateInquiry(value, {
//       target: { name: 'Contents.0.QuardSchool' }
//     });
//   };*/
// /*
//    const handleTantosha = (value, label) => {
//     updateInquiry(value, {
//       target: { name: 'Contents.0.Owner' }
//     });
//   };*/
//
//   const handleCategorySelection = (value) => {
//     updateInquiry(value, {
//       target: { name: 'Contents.0.Category' }
//     });
//   };
//
//   return (<form onSubmit={ () => {} }  className="col-xs-12">
//     <div className="row box-outer">
//       <div className="col-xs-12 col-md-6">
//         <div className="box row">
//           <div className="col-xs-12">
//             <h3>生徒情報</h3>
//           </div>
//           <div className="col-xs-6">
//             <Input
//               autoFocus
//               required
//               type="text"
//               name="LastnameKanji"
//               label="生徒姓（漢字）"
//               value={ inquiry.LastnameKanji || '' }
//               onChange={ updateInquiry }
//             />
//           </div>
//            <div className="col-xs-6">
//             <Input
//               type="text"
//               name="FirstnameKanji"
//               label="生徒名（漢字）"
//               value={ inquiry.FirstnameKanji || '' }
//               onChange={ updateInquiry }
//             />
//           </div>
//           <div className="col-xs-6">
//             <Input
//               required
//               type="text"
//               name="LastnameFurigana"
//               label="生徒姓（ふり）"
//               value={ inquiry.LastnameFurigana || '' }
//               onChange={ updateInquiry }
//             />
//           </div>
//           <div className="col-xs-6">
//             <Input
//               required
//               type="text"
//               name="FirstnameFurigana"
//               label="生徒名（ふり）"
//               value={ inquiry.FirstnameFurigana || '' }
//               onChange={ updateInquiry }
//             />
//           </div>
//           <div className="col-xs-6">
//             <DatePicker
//               label='生年月日'
//               locale={ CALENDAR_LOCALE }
//               sundayFirstDayOfWeek
//               onChange={ handleBirthDate }
//               value={ new Date(inquiry.BirthDate) }
//             />
//           </div>
//           <div className="col-xs-6">
//             <h5 className="inquiry__radio-title">性別</h5>
//             <RadioGroup name='Gender' value={ inquiry.Gender || ''} onChange={ handleGenderSelection }>
//               <RadioButton label="男" value="Male" className="inquiry__radio-inline" />
//               <RadioButton label="女" value="Female" className="inquiry__radio-inline" />
//             </RadioGroup>
//           </div>
//           <div className="col-xs-6">
//             <Dropdown
//               auto
//               label="学年"
//               onChange={ handleSchoolYear }
//               source={ SCHOOL_YEAR }
//               value={ inquiry.SchoolYear || '' }
//             />
//           </div>
//           <div className="col-xs-6">
//             <DynamicAutocomplete
//               isArray
//               label="在籍小中学校"
//               type="School"
//               onChange={ updateInquiry }
//               name="School"
//               value={ inquiry.School || '' }
//               suggestionMatch="anywhere"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="col-xs-12 col-md-6">
//         <div className="box row">
//           <div className="col-xs-12">
//             <h3>保護者情報</h3>
//           </div>
//           <div className="col-xs-6">
//             <Input
//               required
//               type="text"
//               name="Protector.LastnameKanji"
//               label="保護者姓（漢字）"
//               value={ inquiry.Protector.LastnameKanji || '' }
//               onChange={ updateInquiry }
//             />
//           </div>
//           <div className="col-xs-6">
//             <Input
//               required
//               type="text"
//               name="Protector.FirstnameKanji"
//               label="保護者名（漢字）"
//               value={ inquiry.Protector.FirstnameKanji || '' }
//               onChange={ updateInquiry }
//             />
//           </div>
//           <div className="col-xs-6">
//             <Input
//               required
//               type="text"
//               name="Protector.LastnameFurigana"
//               label="保護者姓（ふり）"
//               value={ inquiry.Protector.LastnameFurigana || '' }
//               onChange={ updateInquiry }
//             />
//           </div>
//           <div className="col-xs-6">
//             <Input
//               required
//               type="text"
//               name="Protector.FirstnameFurigana"
//               label="保護者名（ふり）"
//               value={ inquiry.Protector.FirstnameFurigana || '' }
//               onChange={ updateInquiry }
//             />
//           </div>
//           <div className="col-xs-12">
//             <Input
//               required
//               type="text"
//               name="Protector.Phone"
//               label="電話"
//               value={ inquiry.Protector.Phone || '' }
//               onChange={ updateInquiry }
//             />
//           </div>
//           <div className="col-xs-12">
//             <Address
//               name="Protector.Address"
//               value={ inquiry.Protector.Address || {} }
//               onChange={ updateInquiry }
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="row box-outer">
//       <div className="col-xs-12">
//         <div className="box row">
//           <div className="col-xs-12">
//             <h3>問合せ内容</h3>
//           </div>
//           <div className="col-xs-3">
//             <DatePicker
//               label="日付"
//               locale={ CALENDAR_LOCALE }
//               sundayFirstDayOfWeek
//               onChange={ handleInquiryDate }
//               value={ new Date(inquiry.Contents[0].InquiryDate) }
//             />
//           </div>
//           <div className="col-xs-3">
//             <Dropdown
//               auto
//               label="方法"
//               onChange={ handleContactMethod }
//               source={ CONTACT_METHOD }
//               value={ inquiry.Contents[0].ContactMethod || '' }
//             />
//           </div>
//           <div className="col-xs-6">
//             <h5 className="inquiry__radio-title">種別</h5>
//             <RadioGroup name='Gender' value={ inquiry.Contents[0].Category || ''} onChange={ handleCategorySelection }>
//               <RadioButton label="通常" value="通常" className="inquiry__radio-inline" />
//               <RadioButton label="QUARDにより作成" value="QUARDにより作成" className="inquiry__radio-inline" />
//             </RadioGroup>
//           </div>
//           <div className="col-xs-6">
//             <DynamicDropdown
//               label="校舎"
//               type="QuardSchool"
//               name='Contents.0.QuardSchool'
//               onChange={ updateInquiry }
//               value={ inquiry.Contents[0].QuardSchool || '' }
//             />
//           </div>
//           <div className="col-xs-6">
//             <DynamicAutocomplete
//               label="受付担当"
//               type="User"
//               onChange={ updateInquiry }
//               name="Contents.0.Owner"
//               value={ inquiry.Contents[0].Owner ? inquiry.Contents[0].Owner : '' }
//               suggestionMatch="anywhere"
//             />
//           </div>
//           <div className="col-xs-12">
//             <Input
//               type='text'
//               multiline
//               name="Contents.0.Content"
//               label="備考"
//               rows={ 10 }
//               maxLength={ 500 }
//               value={ inquiry.Contents[0].Content }
//               onChange={ updateInquiry }
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="row inquiry__actions">
//       <Button label="保存" onClick={ save } accent raised disabled={isSaving}/>
//       <Button label="キャンセル" onClick={ cancel } raised />
//     </div>
//   </form>);
// };
//
// export default InquiryCreate;
