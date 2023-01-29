import { useEffect, useRef } from 'react'

const useWatch = (value: any, fn: Function, config = { immediate: false }) => {


    const oldValue = useRef()
    const isFirst = useRef(false)

    useEffect(() => {
        if (isFirst.current) {
            if (fn.length == 0) {
                fn()
            } else {
                fn(value, oldValue.current)
            }
        } else {
            isFirst.current = true

            if (config.immediate) {
                if (fn.length == 0) {
                    fn()
                } else {
                    fn(value, oldValue.current)
                }
            }
        }
        oldValue.current = value
    }, [value])
}

export default useWatch