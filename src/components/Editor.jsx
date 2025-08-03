import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RealTimeEditor({
    name,
    label,
    control,
    defaultValue = ""
}) {
  return (
    <div>
        {label && <label className=''> {label} </label>}
        <Controller
         name={name}
         control={control}
         render={({field: {onChange}})=>(
            <Editor 
            apiKey="yfopfcojn2i1692ntwm09oqnq4h5yy2n1f30q0x6u73r852s"
            initialValue={defaultValue}
            init={{
                initialValue: {defaultValue},
                height: 300,
                menubar: true,
                plugin: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"

            }}
            onEditorChange={(content) => onChange(content)}
            />
         )}
        
        />


    </div>
  )
}

export default RealTimeEditor
