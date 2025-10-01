



export function MicControlComponent(gaugeObject,
    baseButtonClass,baseMuteButtonClass,buttonObjectArray, containerClass,controlName)

{

    return`
    <div class="${containerClass}" name="${controlName}">
        <div class="${gaugeObject.typeClass}">
            <div class="${gaugeObject.gaugeClass}" 
            value="${gaugeObject.value}" 
            style="${gaugeObject.styleSet}"
            ></div>
        </div>

        <div class="mic-controls-container">

            ${buttonObjectArray.map(btn =>
                `
                    <button class="${baseButtonClass} ${btn.type.includes('mute') ? 
                    baseMuteButtonClass : ''}" type="${btn.type}" value="${btn.value}">
                    ${btn.label}
                    </button> `
                
            ).join('') }
        </div>
    </div>
    `;
}

