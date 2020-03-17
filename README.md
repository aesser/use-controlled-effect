# useControlledEffect React Hook

Parts of this code is based on [use-debounced-effect](https://github.com/samanmohamadi/use-debounced-effect) 

You can install it using 
```
npm i use-controlled-effect
```

Dummy TS code example:
```
import useControlledEffect from 'use-controlled-effect';
import api from '...';

interface IMyComponentProps {
    someId: number;
}

const MyComponent: React.FC<IMyComponentProps> = (props) => {

    // returns true if effect should run immediately 
    const loadNow = someCondition ? true : false;

    // async side effect that loads data from an api
    const loadData = useCallback(() => {
        const fetchData = async () => {
            const data = await api.loadData(props.someId);
            //...
            setLoading(false);
        };

        setLoading(true);
        fetchData();
    }, [props.someId]);

    useControlledEffect(loadData, () => loadNow, [props], 100);

}

```